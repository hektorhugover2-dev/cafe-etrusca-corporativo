import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { EventService } from '../../../../../shared/kernel/services/event.service';
import { EduNavComponent } from '../../components/edu-nav/edu-nav.component';
import { CourseInterestModalComponent } from '../../components/course-interest-modal/course-interest-modal.component';
import { CourseDate } from '../../education.data';
import { absoluteAsset, eventSeoForCategory, type EventSeo } from './event-seo';

@Component({
  selector: 'app-event-detail-page',
  standalone: true,
  imports: [RouterLink, EduNavComponent, CourseInterestModalComponent],
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['../../edu-theme.scss', './event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit, OnDestroy {
  event: any = null;
  location: any = null;
  seo: EventSeo = eventSeoForCategory(null);
  imageUrl = '';
  mapSrc: SafeResourceUrl | null = null;
  interestOpen = false;
  interestDate: CourseDate | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private events = inject(EventService);
  private seoService = inject(SeoService);
  private document = inject(DOCUMENT);
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const slug = this.route.snapshot.paramMap.get('slug') || '';
      const found = data['event'];
      if (!found || this.isExpired(found)) {
        this.router.navigate(['/cursos-para-baristas-y-talleres-para-cafeterias']);
        return;
      }
      this.hydrate(found, slug);
    });
  }

  ngOnDestroy() {
    this.clearJsonLd();
  }

  get categoryName(): string {
    return this.event?.category?.name || 'Curso Café Etrusca';
  }

  get categoryDescription(): string {
    return this.event?.category?.description || '';
  }

  get locationName(): string {
    return (this.location?.name || this.event?.locationName || 'Café Etrusca').replace(/^Sucursal\s+/i, '');
  }

  get dateLabel(): string {
    if (!this.event?.start) return '';
    const start = new Date(this.event.start);
    if (isNaN(start.getTime())) return '';
    return start.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  get priceLabel(): string {
    const price = this.event?.category?.price;
    if (price == null || price === '') return '';
    const n = Number(price);
    if (!isFinite(n)) return '';
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);
  }

  openInterest() {
    this.interestOpen = true;
  }

  closeInterest() {
    this.interestOpen = false;
  }

  telHref(phone: string): string {
    const digits = (phone || '').replace(/[^\d+]/g, '');
    return digits ? 'tel:' + digits : '';
  }

  private hydrate(found: any, slug: string) {
    this.event = found;
    this.location = found.location || {};
    this.seo = eventSeoForCategory(found.categoryId);
    this.imageUrl = absoluteAsset(found.image || found.category?.image);
    this.interestDate = this.events.mapEventToDate(found);
    this.mapSrc = this.embedUrl(this.location?.urlEmbed);
    this.applySeo(found, slug);
    this.setJsonLd(found, slug);
  }

  private isExpired(event: any): boolean {
    if (!event?.end) return false;
    const end = new Date(event.end);
    if (isNaN(end.getTime())) return false;
    return end.getFullYear() < new Date().getFullYear();
  }

  private embedUrl(raw: string | null | undefined): SafeResourceUrl | null {
    if (!raw) return null;
    if (/^https:\/\/www\.google\.com\/maps\/embed(\?|$)/i.test(raw)) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(raw);
    }
    if (/^https?:\/\//i.test(raw)) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(raw);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=' + raw
    );
  }

  private applySeo(event: any, slug: string) {
    const title = `${event.title || this.locationName} | Café Etrusca`;
    const description = this.seo.description;
    const image = absoluteAsset(event.image || event.banner || '');
    this.seoService.set({
      title,
      description,
      keywords: this.seo.keywords,
      image: image || undefined,
      ogType: 'website'
    });
  }

  private setJsonLd(event: any, slug: string) {
    this.clearJsonLd();
    const loc = event.location || {};
    const origin = this.document.location?.origin || 'https://cafeetrusca.com';
    const url = `${origin}/cursos-y-talleres/${slug}`;
    const price = Number(event.category?.price || 0);
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: event.title,
      startDate: event.start,
      endDate: event.end,
      url,
      image: this.imageUrl,
      description: this.seo.description,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      performer: { '@type': 'Organization', name: 'Etrusca Comercial', url: 'https://cafeetrusca.com/' },
      organizer: { '@type': 'Organization', name: 'Etrusca Comercial', url: 'https://cafeetrusca.com/' },
      offers: {
        '@type': 'Offer',
        url,
        price: isFinite(price) ? price : 0,
        priceCurrency: 'MXN',
        availability: 'https://schema.org/InStock',
        validFrom: event.start
      },
      location: {
        '@type': 'Place',
        name: loc.name || 'Café Etrusca',
        address: {
          '@type': 'PostalAddress',
          addressLocality: loc.city || '',
          addressRegion: loc.addressRegion || loc.state || '',
          postalCode: loc.postalCode || '',
          streetAddress: loc.locationAdress || ''
        }
      }
    };
    const el = this.document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'event-jsonld';
    el.text = JSON.stringify(payload);
    this.document.head.appendChild(el);
  }

  private clearJsonLd() {
    this.document.getElementById('event-jsonld')?.remove();
  }
}
