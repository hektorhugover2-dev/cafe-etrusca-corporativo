import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
  PLATFORM_ID
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CourseDate } from '../../education.data';

const COURSE_CONTACT_URL = 'https://cafeetrusca.com/api/CourseContact';
const FALLBACK_EMAIL = 'educacion@cafeetrusca.com';
const FALLBACK_PHONE = '(55) 4166 8777';
const OCCUPATIONS = ['Emprendedor', 'Barista', 'Consumidor'] as const;

@Component({
  selector: 'app-course-interest-modal',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './course-interest-modal.component.html',
  styleUrls: ['./course-interest-modal.component.scss']
})
export class CourseInterestModalComponent implements OnChanges {
  @Input() open = false;
  @Input() courseTitle = '';
  @Input() date: CourseDate | null = null;
  @Output() closed = new EventEmitter<void>();

  @ViewChild('dialogEl') dialogEl?: ElementRef<HTMLElement>;
  @ViewChild('nameInput') nameInput?: ElementRef<HTMLInputElement>;

  private http = inject(HttpClient);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private sanitizer = inject(DomSanitizer);

  readonly isBrowser = isPlatformBrowser(this.platformId);

  name = '';
  telephone = '';
  email = '';
  message = '';
  ocupacionEmprendedor = false;
  ocupacionBarista = false;
  ocupacionConsumidor = false;
  newsletter = true;
  privacy = true;
  website = '';

  submitting = false;
  successMessage = '';
  errorMessage = '';
  submitted = false;

  safeMapSrc: SafeResourceUrl | null = null;
  private previousOverflow = '';
  private opener: HTMLElement | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open']) {
      if (this.open) {
        this.onOpened();
      } else {
        this.onClosed();
      }
    }
    if (changes['date'] || changes['open']) {
      this.updateMap();
    }
  }

  get displayTitle(): string {
    const raw = (this.date?.categoryName || this.courseTitle || '').trim();
    return raw.toUpperCase();
  }

  get hoursLabel(): string {
    return this.date?.hours || 'Consultar horario';
  }

  get emailLabel(): string {
    return this.date?.email || FALLBACK_EMAIL;
  }

  get phoneLabel(): string {
    return this.date?.telephone || FALLBACK_PHONE;
  }

  get branchLabel(): string {
    return this.date?.locationName || this.date?.branch || '';
  }

  get mapHref(): string {
    return this.date?.mapUrl || '';
  }

  get dateRangeLabel(): string {
    return this.formatFecha(this.date);
  }

  get mapAvailable(): boolean {
    return !!this.safeMapSrc;
  }

  close() {
    this.closed.emit();
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent) {
    if (!this.open || !this.isBrowser) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }
    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  submit(form: NgForm) {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.privacy) {
      this.errorMessage = 'Debes aceptar el aviso de privacidad para enviar.';
      return;
    }
    if (form.invalid || this.submitting) {
      return;
    }
    if (!this.isBrowser) {
      return;
    }

    const ocupacion = this.joinedOccupations();
    const payload = {
      name: this.name.trim(),
      email: this.email.trim(),
      fatherlastname: '-',
      motherlastname: '-',
      telephone: this.telephone.trim(),
      message: this.message.trim() || '-',
      ciudad: '-',
      ocupacion,
      sucursal: this.date?.branch || this.date?.locationName || '-',
      emailsucursal: this.date?.email || FALLBACK_EMAIL,
      emailbarista: this.date?.emailBarista || '-',
      fecha: this.formatFecha(this.date),
      curso: this.date?.categoryName || this.courseTitle || '-',
      newsletter: this.newsletter ? 1 : 0,
      url: this.document.location?.href || '',
      type: 0,
      website: this.website || '',
      subject: this.website || ''
    };

    this.submitting = true;

    if (this.isLocalHost()) {
      console.info('[CourseContact] POST skipped on local hostname', this.document.location?.hostname);
      this.submitting = false;
      this.successMessage = 'Gracias por su mensaje';
      form.resetForm({ newsletter: true, privacy: true, website: '' });
      this.resetFieldsKeepFlags();
      return;
    }

    this.http
      .post(COURSE_CONTACT_URL, payload, {
        headers: { 'Content-Type': 'application/json' }
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.successMessage = 'Gracias por su mensaje';
          form.resetForm({ newsletter: true, privacy: true, website: '' });
          this.resetFieldsKeepFlags();
        },
        error: () => {
          this.submitting = false;
          this.errorMessage = 'No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.';
        }
      });
  }

  telHref(phone: string): string {
    const digits = (phone || '').replace(/[^\d+]/g, '');
    return digits ? 'tel:' + digits : '';
  }

  private bodyLocked = false;

  private onOpened() {
    this.successMessage = '';
    this.errorMessage = '';
    this.submitted = false;
    if (!this.isBrowser) {
      return;
    }
    const active = this.document.activeElement as HTMLElement | null;
    this.opener = active && typeof active.focus === 'function' ? active : null;
    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.bodyLocked = true;
    setTimeout(() => this.nameInput?.nativeElement?.focus(), 40);
  }

  private onClosed() {
    if (!this.isBrowser || !this.bodyLocked) {
      return;
    }
    this.bodyLocked = false;
    this.document.body.style.overflow = this.previousOverflow;
    if (this.opener && typeof this.opener.focus === 'function') {
      this.opener.focus();
    }
    this.opener = null;
  }

  private updateMap() {
    const src = this.buildMapSrc(this.date?.mapEmbed || '');
    this.safeMapSrc = src
      ? this.sanitizer.bypassSecurityTrustResourceUrl(src)
      : null;
  }

  private buildMapSrc(urlEmbed: string): string {
    const raw = (urlEmbed || '').trim();
    if (!raw) {
      return '';
    }
    if (/^https:\/\/www\.google\.com\/maps\/embed(\?|$)/i.test(raw)) {
      return raw;
    }
    if (/^https?:\/\//i.test(raw)) {
      return raw.includes('google.com/maps/embed') ? raw : '';
    }
    return 'https://www.google.com/maps/embed?pb=' + raw;
  }

  private formatFecha(date: CourseDate | null): string {
    if (!date) {
      return '-';
    }
    if (date.start) {
      const start = new Date(date.start);
      const end = date.end ? new Date(date.end) : start;
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const sameDay =
          start.getFullYear() === end.getFullYear() &&
          start.getMonth() === end.getMonth() &&
          start.getDate() === end.getDate();
        const sameMonth =
          start.getFullYear() === end.getFullYear() &&
          start.getMonth() === end.getMonth();
        const dayFmt = (d: Date) => d.getDate().toString();
        const monthFmt = (d: Date) => {
          const m = d.toLocaleString('es-MX', { month: 'long' });
          return m.charAt(0).toUpperCase() + m.slice(1);
        };
        const yearFmt = (d: Date) => d.getFullYear().toString();
        if (sameDay) {
          return `${dayFmt(start)} de ${monthFmt(start)} de ${yearFmt(start)}`;
        }
        if (sameMonth) {
          return `${dayFmt(start)} al ${dayFmt(end)} de ${monthFmt(start)} de ${yearFmt(start)}`;
        }
        return `${dayFmt(start)} de ${monthFmt(start)} al ${dayFmt(end)} de ${monthFmt(end)} de ${yearFmt(end)}`;
      }
    }
    if (date.days && date.month) {
      return `${date.days} de ${date.month}`;
    }
    return '-';
  }

  private joinedOccupations(): string {
    const selected: string[] = [];
    if (this.ocupacionEmprendedor) selected.push(OCCUPATIONS[0]);
    if (this.ocupacionBarista) selected.push(OCCUPATIONS[1]);
    if (this.ocupacionConsumidor) selected.push(OCCUPATIONS[2]);
    return selected.length ? selected.join(', ') : '-';
  }

  private isLocalHost(): boolean {
    const host = (this.document.location?.hostname || '').toLowerCase();
    return (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host === '[::1]' ||
      host.endsWith('.local')
    );
  }

  private trapFocus(event: KeyboardEvent) {
    const root = this.dialogEl?.nativeElement;
    if (!root) {
      return;
    }
    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'
      )
    ).filter(el => !el.hasAttribute('hidden') && el.tabIndex !== -1 && el.offsetParent !== null);
    if (!nodes.length) {
      event.preventDefault();
      return;
    }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = this.document.activeElement as HTMLElement | null;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private resetFieldsKeepFlags() {
    this.name = '';
    this.telephone = '';
    this.email = '';
    this.message = '';
    this.ocupacionEmprendedor = false;
    this.ocupacionBarista = false;
    this.ocupacionConsumidor = false;
    this.newsletter = true;
    this.privacy = true;
    this.website = '';
  }
}
