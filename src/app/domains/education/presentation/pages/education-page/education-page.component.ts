import { Component, ElementRef, OnDestroy, OnInit, ViewChild, afterNextRender, inject, PLATFORM_ID, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PAST_EVENT_FORM_FRAGMENT } from '../../event-paths';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { CompromisoComponent } from '../../../../../shared/ui/compromiso/compromiso.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { CourseInterestModalComponent } from '../../components/course-interest-modal/course-interest-modal.component';
import {
  BARISTAS,
  COURSES,
  Course,
  CourseDate,
  EDU_NAV,
  PATHS,
  SCA_CERTS,
  THIS_MONTH,
  Barista
} from '../../education.data';
import { ReviewsSliderComponent } from '../../components/reviews-slider/reviews-slider.component';
import { PATH_QUIZ, PATH_QUIZ_RESULTS, PATH_QUIZ_RESULTS_EXPERIENCIA, PathProfile, PathQuizResult } from '../../path-quiz.data';
import { coursePublicPath } from '../../course-public-paths';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';

interface QuizCourseLink {
  title: string;
  kicker: string;
  path: string;
}

const KIND_ICONS: Record<string, string> = {
  cursos: `${ASSETS_BASE_URL}/images/educacion/icon-cursos.webp`,
  experiencias: `${ASSETS_BASE_URL}/images/educacion/icon-experiencias.webp`,
  talleres: `${ASSETS_BASE_URL}/images/educacion/icon-talleres.webp`,
  sesiones: `${ASSETS_BASE_URL}/images/educacion/icon-sesiones.webp`
};

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [RouterLink, CompromisoComponent, ScrollWaveComponent, CourseInterestModalComponent, ReviewsSliderComponent],
  templateUrl: './education-page.component.html',
  styleUrls: ['../../edu-theme.scss', './education-page.component.scss']
})
export class EducationPageComponent implements OnInit, OnDestroy {
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  cats = EDU_NAV;
  month = THIS_MONTH;
  paths = PATHS;
  certs = SCA_CERTS;
  baristas = BARISTAS;
  featuredIndex = Math.max(0, BARISTAS.findIndex(b => b.name === 'Araceli García'));
  branchFilter = '';
  private baristaTimer: ReturnType<typeof setInterval> | null = null;
  private baristaPaused = false;
  quiz = PATH_QUIZ;
  /** Current wizard step (0..quiz.length-1); quiz.length = result. */
  step = 0;
  /** Selected option index per question. */
  answers: Array<number | null> = PATH_QUIZ.map(() => null);
  @ViewChild('quizHeading') quizHeading?: ElementRef<HTMLElement>;

  interestOpen = false;
  interestTitle = '';
  interestDate: CourseDate | null = null;
  /** Modal opened by #solicitar-informacion (past/unknown event URL without course): no date. */
  interestHideDate = false;
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private seo = inject(SeoService);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  /** Animación HyperFrames de arte latte en el CTA "¿Quieres comenzar tu camino?" (archivos en public/assets/videos/educacion/). */
  readonly ctaVideo = {
    webm: '/assets/videos/educacion/latte-art.webm',
    mp4: '/assets/videos/educacion/latte-art.mp4',
    poster: '/assets/videos/educacion/latte-art-poster.webp'
  };
  /** Solo en cliente y sin prefers-reduced-motion; en SSR queda la foto actual. */
  readonly ctaVideoOn = signal(false);
  /** Con prefers-reduced-motion se muestra el poster (fotograma del corazón) en lugar del video. */
  readonly ctaReduced = signal(false);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      if (mq && mq.matches) { this.ctaReduced.set(true); return; }
      this.ctaVideoOn.set(true);
    });
  }

  /** Angular no refleja `muted` como atributo; se fuerza para que el autoplay no se bloquee. */
  playCtaVideo(ev: Event): void {
    const v = ev.target as HTMLVideoElement;
    v.muted = true;
    v.play?.().catch(() => {});
  }

  ngOnInit() {
    const title = 'Cursos Para Baristas y Talleres Para Cafeterías - Sé un profesional';
    const description =
      'Cursos Para Baristas y Talleres Para Cafeterías destinados para quien desea iniciarse en el Barismo, especializarse como Baristas y emprender una cafetería.';
    const keywords =
      'arte latte,Brew Bar,Cold Brew,cursos para barista,Café Etrusca,cafeterías,certificaciones,mixología,catación';
    this.seo.set({
      title,
      description,
      keywords,
      image: `${ASSETS_BASE_URL}/images/educacion/icon-cursos.webp`,
      ogType: 'website',
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': url + '#education',
          name: title,
          description,
          url,
          isPartOf: { '@id': origin + '/#website' },
          about: {
            '@type': 'Thing',
            name: 'Educación para baristas y cafeterías'
          }
        }
      ]
    });
    this.startBaristaTimer();
    if (isPlatformBrowser(this.platformId)) {
      // /cursos-para-baristas-y-talleres-para-cafeterias/#solicitar-informacion: target of past or
      // unknown /cursos-y-talleres/<slug> URLs without a course page (IIS/server 301, event resolver).
      // IIS may append the query string after the fragment (#solicitar-informacion?utm_…).
      this.route.fragment.subscribe((f) => {
        if (String(f || '').split('?')[0] === PAST_EVENT_FORM_FRAGMENT) this.openInfoRequest();
      });
    }
  }

  /** Same "solicitar información" form as the course pages, without course date. */
  openInfoRequest() {
    this.interestTitle = 'Cursos y talleres';
    this.interestDate = null;
    this.interestHideDate = true;
    this.interestOpen = true;
  }

  ngOnDestroy() {
    this.stopBaristaTimer();
  }

  get branches() {
    return [...new Set(this.baristas.map(b => b.place))];
  }

  get filteredBaristas(): Barista[] {
    if (!this.branchFilter) {
      return this.baristas;
    }
    return this.baristas.filter(b => b.place === this.branchFilter);
  }

  get featured(): Barista | null {
    const list = this.filteredBaristas;
    return list[this.featuredIndex] || list[0] || null;
  }

  get others(): Barista[] {
    const list = this.filteredBaristas;
    if (list.length < 2) {
      return [];
    }
    const out: Barista[] = [];
    const take = Math.min(6, list.length - 1);
    for (let i = 1; i <= take; i++) {
      out.push(list[(this.featuredIndex + i) % list.length]);
    }
    return out;
  }

  certIcon(id: string) {
    return this.certs.find(c => c.id === id)?.icon || '';
  }

  certLabel(id: string) {
    return this.certs.find(c => c.id === id)?.label || id;
  }

  filterBranch(value: string) {
    this.branchFilter = value;
    this.featuredIndex = 0;
    this.restartBaristaTimer();
  }

  selectBarista(name: string) {
    const idx = this.filteredBaristas.findIndex(b => b.name === name);
    if (idx >= 0) {
      this.featuredIndex = idx;
      this.restartBaristaTimer();
    }
  }

  nextBarista() {
    const n = this.filteredBaristas.length;
    if (!n) return;
    this.featuredIndex = (this.featuredIndex + 1) % n;
    this.restartBaristaTimer();
  }

  prevBarista() {
    const n = this.filteredBaristas.length;
    if (!n) return;
    this.featuredIndex = (this.featuredIndex - 1 + n) % n;
    this.restartBaristaTimer();
  }

  pauseBaristas() {
    this.baristaPaused = true;
  }

  resumeBaristas() {
    this.baristaPaused = false;
  }

  private startBaristaTimer() {
    if (!isPlatformBrowser(this.platformId) || this.baristaTimer) {
      return;
    }
    this.baristaTimer = setInterval(() => {
      if (this.baristaPaused) {
        return;
      }
      const n = this.filteredBaristas.length;
      if (!n) {
        return;
      }
      this.featuredIndex = (this.featuredIndex + 1) % n;
    }, 5000);
  }

  private stopBaristaTimer() {
    if (this.baristaTimer) {
      clearInterval(this.baristaTimer);
      this.baristaTimer = null;
    }
  }

  private restartBaristaTimer() {
    this.stopBaristaTimer();
    this.startBaristaTimer();
  }

  iconFor(kind: string) {
    return KIND_ICONS[kind] || KIND_ICONS['cursos'];
  }

  get picked(): number | null {
    return this.answers[this.step] ?? null;
  }

  pick(index: number) {
    if (this.step < this.quiz.length) this.answers[this.step] = index;
  }

  /** Radio-group keyboard support: arrows move and select, Home/End jump. */
  onOptionKey(ev: KeyboardEvent, index: number) {
    const n = this.quiz[this.step]?.options.length || 0;
    let target = -1;
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') target = (index + 1) % n;
    else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') target = (index - 1 + n) % n;
    else if (ev.key === 'Home') target = 0;
    else if (ev.key === 'End') target = n - 1;
    else if (ev.key === ' ' || ev.key === 'Enter') {
      ev.preventDefault();
      this.pick(index);
      if (ev.key === 'Enter') this.next();
      return;
    }
    if (target < 0) return;
    ev.preventDefault();
    this.pick(target);
    const group = (ev.currentTarget as HTMLElement).parentElement;
    (group?.children[target] as HTMLElement | undefined)?.focus();
  }

  optionTabIndex(index: number): number {
    const p = this.picked;
    return (p === null ? index === 0 : p === index) ? 0 : -1;
  }

  next() {
    if (this.picked === null) return;
    this.step = Math.min(this.step + 1, this.quiz.length);
    this.focusQuiz();
  }

  back() {
    if (this.step > 0) {
      this.step -= 1;
      this.focusQuiz();
    }
  }

  get profile(): PathProfile {
    const tally: Partial<Record<PathProfile, number>> = {};
    const picks = this.answers.map((a, i) => (a === null ? null : this.quiz[i].options[a]?.profile || null));
    for (const p of picks) if (p) tally[p] = (tally[p] || 0) + 1;
    const max = Math.max(0, ...Object.values(tally).map((v) => v || 0));
    const first = picks[0];
    if (first && tally[first] === max) return first;
    return (Object.entries(tally).find(([, v]) => v === max)?.[0] as PathProfile) || 'barista';
  }

  /** The last answer asked for the short (3 h) format → experiencias only. */
  get wantsExperiencia(): boolean {
    const last = this.quiz.length - 1;
    const a = this.answers[last];
    return a !== null && !!this.quiz[last].options[a]?.experiencia;
  }

  get quizResult(): PathQuizResult {
    return (this.wantsExperiencia ? PATH_QUIZ_RESULTS_EXPERIENCIA : PATH_QUIZ_RESULTS)[this.profile];
  }

  /** Catalog course by slug; `primary` in the 3 h scenario only accepts experiencias. */
  quizCourse(slug: string | undefined, primary = false): QuizCourseLink | null {
    const c = slug
      ? COURSES.find((x) => x.slug === slug && (!primary || !this.wantsExperiencia || x.kind === 'experiencias'))
      : undefined;
    return c ? { title: c.title, kicker: c.kicker, path: coursePublicPath(c) } : null;
  }

  /** "Taller recomendado" / "Curso recomendado" / "Experiencia recomendada". */
  recommendedLabel(kicker: string): string {
    return `${kicker} ${/a$/i.test(kicker) ? 'recomendada' : 'recomendado'}`;
  }

  resetQuiz() {
    this.step = 0;
    this.answers = PATH_QUIZ.map(() => null);
    this.focusQuiz();
  }

  private focusQuiz() {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => this.quizHeading?.nativeElement.focus({ preventScroll: true }));
  }

  openInterest(course: Course) {
    this.interestTitle = course.title;
    this.interestDate = course.dates?.[0] || null;
    this.interestHideDate = false;
    this.interestOpen = true;
  }

  closeInterest() {
    this.interestOpen = false;
    if (this.interestHideDate && this.route.snapshot.fragment) {
      // Drop #solicitar-informacion so a reload does not reopen the form.
      this.router.navigate([], { relativeTo: this.route, replaceUrl: true, queryParamsHandling: 'preserve' });
    }
  }

}
