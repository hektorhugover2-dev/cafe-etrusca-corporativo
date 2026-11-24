import { Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

/**
 * Misma sección «Opiniones de clientes» de la hub de educación.
 * El markup y los estilos son los de esa página; en el navegador puede
 * sustituir las tarjetas con reseñas de la API, pero el JSON-LD usa
 * siempre las 9 reseñas estáticas de opinions.data.ts (las prerenderizadas).
 */
@Component({
  selector: 'app-reviews-slider',
  standalone: true,
  templateUrl: './reviews-slider.component.html',
  styleUrls: ['./reviews-slider.component.scss']
})
export class ReviewsSliderComponent implements OnInit, OnDestroy {
  reviews: ReviewCard[] = OPINIONS;
  reviewIndex = 0;
  starSlots = [1, 2, 3, 4, 5];
  private reviewTimer: ReturnType<typeof setInterval> | null = null;
  private reviewPaused = false;
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    this.loadReviews();
  }

  ngOnDestroy() {
    this.stopReviewTimer();
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
