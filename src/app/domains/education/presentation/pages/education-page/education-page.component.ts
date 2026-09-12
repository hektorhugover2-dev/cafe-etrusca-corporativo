import { Component, OnDestroy, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
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
  QUIZ,
  SCA_CERTS,
  THIS_MONTH,
  Barista
} from '../../education.data';
import { OPINIONS, ReviewCard } from '../../opinions.data';

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
  quiz = QUIZ;
  reviews: ReviewCard[] = OPINIONS;
  reviewIndex = 0;
  starSlots = [1, 2, 3, 4, 5];
  private reviewTimer: ReturnType<typeof setInterval> | null = null;
  private reviewPaused = false;
  private http = inject(HttpClient);
  step = 0;
  votes: string[] = [];
  picked: string | null = null;
  pickedLabel: string | null = null;

  interestOpen = false;
  interestTitle = '';
  interestDate: CourseDate | null = null;

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
      image: '/assets/images/educacion/hero-banner.png',
      canonical: 'https://cafeetrusca.com/cursos-para-baristas-y-talleres-para-cafeterias',
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

  pick(path: string, label: string) {
    this.picked = path;
    this.pickedLabel = label;
  }

  next() {
    if (!this.picked) {
      return;
    }
    this.choose(this.picked);
    this.picked = null;
    this.pickedLabel = null;
  }

  choose(path: string) {
    this.votes.push(path);
    if (this.step < this.quiz.length - 1) {
      this.step += 1;
    } else {
      this.step = this.quiz.length;
    }
  }

  get result() {
    const tally: Record<string, number> = {};
    for (const v of this.votes) tally[v] = (tally[v] || 0) + 1;
    return Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] || 'cursos';
  }

  resetQuiz() {
    this.step = 0;
    this.votes = [];
    this.picked = null;
    this.pickedLabel = null;
  }

  openInterest(course: Course) {
    this.interestTitle = course.title;
    this.interestDate = course.dates?.[0] || null;
    this.interestOpen = true;
  }

  closeInterest() {
    this.interestOpen = false;
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
