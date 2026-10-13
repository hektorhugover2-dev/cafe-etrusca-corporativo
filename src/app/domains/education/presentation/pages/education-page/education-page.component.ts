import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
import { OPINIONS, ReviewCard } from '../../opinions.data';
import { PATH_QUIZ, PATH_QUIZ_RESULTS, PATH_QUIZ_RESULTS_EXPERIENCIA, PathProfile, PathQuizResult } from '../../path-quiz.data';
import { coursePublicPath } from '../../course-public-paths';

interface QuizCourseLink {
  title: string;
  kicker: string;
  path: string;
}

interface CertificadoRow {
  Id?: string;
  Nombre?: string;
  ApellidoPaterno?: string;
  Comentarios?: string;
  CalificacionTallerista?: string;
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

const KIND_ICONS: Record<string, string> = {
  cursos: '/assets/images/educacion/icon-cursos.png',
  experiencias: '/assets/images/educacion/icon-experiencias.png',
  talleres: '/assets/images/educacion/icon-talleres.png',
  sesiones: '/assets/images/educacion/icon-sesiones.png'
};

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [RouterLink, CompromisoComponent, ScrollWaveComponent, CourseInterestModalComponent],
  templateUrl: './education-page.component.html',
  styleUrls: ['../../edu-theme.scss', './education-page.component.scss']
})
export class EducationPageComponent implements OnInit, OnDestroy {
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
  reviews: ReviewCard[] = OPINIONS;
  reviewIndex = 0;
  starSlots = [1, 2, 3, 4, 5];
  private reviewTimer: ReturnType<typeof setInterval> | null = null;
  private reviewPaused = false;
  private http = inject(HttpClient);
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
      image: '/assets/images/educacion/icon-cursos.png',
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
    this.loadReviews();
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
    this.stopReviewTimer();
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
  get visibleReviews(): ReviewCard[] {
    const n = this.reviews.length;
    if (!n) return [];
    const count = Math.min(3, n);
    const out: ReviewCard[] = [];
    for (let i = 0; i < count; i++) {
      out.push(this.reviews[(this.reviewIndex + i) % n]);
    }
    return out;
  }

  nextReview() {
    const n = this.reviews.length;
    if (!n) return;
    this.reviewIndex = (this.reviewIndex + 1) % n;
    this.restartReviewTimer();
  }

  prevReview() {
    const n = this.reviews.length;
    if (!n) return;
    this.reviewIndex = (this.reviewIndex - 1 + n) % n;
    this.restartReviewTimer();
  }

  pauseReviews() { this.reviewPaused = true; }
  resumeReviews() { this.reviewPaused = false; }

  private loadReviews() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.startReviewTimer();
    this.http.get<{ data?: CertificadoRow[] }>('https://intranet.cafeetrusca.com/api/v1/venta/certificados/-1').subscribe({
      next: (res) => {
        const rows: CertificadoRow[] = Array.isArray(res.data) ? res.data : [];
        const mapped = rows.map((row) => this.mapCertificado(row)).filter((x): x is ReviewCard => !!x);
        if (mapped.length >= 3) {
          this.reviews = mapped.slice(0, 24);
          this.reviewIndex = 0;
        }
      },
      error: () => {}
    });
  }

  private mapCertificado(row: CertificadoRow): ReviewCard | null {
    const text = decodeHtml(String(row.Comentarios || '')).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const low = text.toLowerCase();
    const skip = ['', 'no', 'n/a', 'na', 'ninguno', 'ninguna', 'si', 'sí', '.', '-', 'ok'];
    if (text.length < 8 || skip.indexOf(low) >= 0) return null;
    const first = String(row.Nombre || '').trim();
    const last = String(row.ApellidoPaterno || '').trim();
    const firstToken = first.split(/\s+/)[0] || '';
    const lastInitial = last.charAt(0);
    const name = lastInitial ? firstToken + ' ' + lastInitial + '.' : firstToken;
    const initials = ((firstToken.charAt(0) || '') + (lastInitial || '')).toUpperCase() || '?';
    const rating = Math.min(5, Math.max(1, parseInt(String(row.CalificacionTallerista || '5'), 10) || 5));
    return { id: String(row.Id || name + text.slice(0, 12)), initials, name, rating, text };
  }

  private startReviewTimer() {
    if (!isPlatformBrowser(this.platformId) || this.reviewTimer) return;
    this.reviewTimer = setInterval(() => {
      if (this.reviewPaused) return;
      const n = this.reviews.length;
      if (n < 2) return;
      this.reviewIndex = (this.reviewIndex + 1) % n;
    }, 5000);
  }

  private stopReviewTimer() {
    if (this.reviewTimer) {
      clearInterval(this.reviewTimer);
      this.reviewTimer = null;
    }
  }

  private restartReviewTimer() {
    this.stopReviewTimer();
    this.startReviewTimer();
  }

}
