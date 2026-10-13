import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
  inject,
  output
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { swalToast } from '../../../../shared/kernel/utils/swal-toast';

type HelpMode = 'newsletter' | 'contact';
type AnimDir = 'forward' | 'back';

@Component({
  selector: 'app-home-help-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home-help-form.component.html',
  styleUrl: './home-help-form.component.scss'
})
export class HomeHelpFormComponent {
  private readonly http = inject(HttpClient);
  private readonly isBrowser: boolean;

  @ViewChild('stepBox') stepBox?: ElementRef<HTMLElement>;

  mode: HelpMode | null = null;
  step = 0;
  animDir: AnimDir = 'forward';
  shake = false;
  submitting = false;

  newsletter = { name: '', email: '', privacy: false };
  contact = {
    subject: '',
    name: '',
    email: '',
    message: '',
    privacy: false
  };

  readonly subjects = [
    { value: 'productos', label: 'Información de productos' },
    { value: 'pedidos', label: 'Dudas sobre mi pedido' },
    { value: 'soporte', label: 'Soporte técnico de máquinas' },
    { value: 'otro', label: 'Otro comentario' }
  ] as const;

  private readonly contactUsUrl = 'https://cafeetrusca.com/api/ContactUs';
  private readonly newsletterUrl = 'https://cafeetrusca.com/api/newsletter';

  /** Notifica al home el modo activo y si hay campos con texto (Lucky). */
  readonly modeChange = output<HelpMode | null>();
  readonly formTouch = output<{ mode: HelpMode | null; filling: boolean }>();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get totalSteps(): number {
    return this.mode === 'newsletter' ? 2 : 4;
  }

  get isDone(): boolean {
    return !!this.mode && this.step >= this.totalSteps;
  }

  get progressCurrent(): number {
    return Math.min(this.step, this.totalSteps - 1);
  }

  get nextLabel(): string {
    return this.step === this.totalSteps - 1 ? '✓' : '→';
  }

  get stepIndexes(): number[] {
    return Array.from({ length: this.totalSteps }, (_, i) => i);
  }


  private emitState(): void {
    this.modeChange.emit(this.mode);
    const filling =
      this.mode === 'newsletter'
        ? [this.newsletter.name, this.newsletter.email].some((v) => (v || '').trim().length > 0)
        : this.mode === 'contact'
          ? [this.contact.subject, this.contact.name, this.contact.email, this.contact.message].some(
              (v) => (v || '').trim().length > 0
            )
          : false;
    this.formTouch.emit({ mode: this.mode, filling });
  }

  startMode(mode: HelpMode): void {
    this.mode = mode;
    this.step = 0;
    this.animDir = 'forward';
    this.emitState();
  }

  selectSubject(value: string): void {
    this.contact.subject = value;
    this.emitState();
  }

  goBack(): void {
    if (!this.mode || this.isDone) return;
    if (this.step === 0) {
      this.resetToHome();
      return;
    }
    this.step -= 1;
    this.animDir = 'back';
  }

  goNext(): void {
    if (!this.mode || this.isDone || this.submitting) return;
    if (!this.isCurrentStepValid()) {
      this.triggerShake();
      return;
    }
    if (this.step < this.totalSteps - 1) {
      this.step += 1;
      this.animDir = 'forward';
      return;
    }
    if (this.mode === 'newsletter') {
      this.submitNewsletter();
    } else {
      this.submitContact();
    }
  }

  resetToHome(): void {
    this.mode = null;
    this.step = 0;
    this.animDir = 'forward';
    this.shake = false;
    this.submitting = false;
    this.newsletter = { name: '', email: '', privacy: false };
    this.contact = { subject: '', name: '', email: '', message: '', privacy: false };
    this.emitState();
  }

  isCurrentStepValid(): boolean {
    if (this.mode === 'newsletter') {
      if (this.step === 0) return !!this.newsletter.name.trim();
      if (this.step === 1) {
        return !!this.newsletter.email.trim() && this.newsletter.privacy && this.isEmail(this.newsletter.email);
      }
    }
    if (this.mode === 'contact') {
      if (this.step === 0) return !!this.contact.subject;
      if (this.step === 1) return !!this.contact.name.trim();
      if (this.step === 2) return !!this.contact.email.trim() && this.isEmail(this.contact.email);
      if (this.step === 3) return !!this.contact.message.trim() && this.contact.privacy;
    }
    return true;
  }

  onFieldChange(): void {
    this.emitState();
  }

  private isEmail(v: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  private triggerShake(): void {
    this.shake = false;
    // Force reflow on browser only
    if (this.isBrowser) {
      requestAnimationFrame(() => {
        this.shake = true;
        setTimeout(() => (this.shake = false), 240);
      });
    } else {
      this.shake = true;
    }
  }

  private isLocalHost(): boolean {
    if (!this.isBrowser) return true;
    const host = (window.location.hostname || '').toLowerCase();
    return (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host.endsWith('.local')
    );
  }

  private currentUrl(): string {
    return this.isBrowser ? window.location.href : '';
  }

  private submitNewsletter(): void {
    const first_name = this.newsletter.name.trim();
    const email = this.newsletter.email.trim();
    if (!first_name || !email || !this.newsletter.privacy) {
      this.triggerShake();
      return;
    }
    this.submitting = true;
    const finishOk = () => {
      void swalToast('success', '¡Gracias por suscribirte!');
      this.submitting = false;
      this.step = this.totalSteps;
      this.animDir = 'forward';
    };
    const payload = { first_name, last_name: '', email };
    if (this.isLocalHost()) {
      console.info('[Newsletter] POST skipped on local hostname', payload);
      finishOk();
      return;
    }
    this.http
      .post(this.newsletterUrl, payload, { headers: { 'Content-Type': 'application/json' } })
      .subscribe({
        next: () => finishOk(),
        error: (err) => {
          console.error(err);
          void swalToast('error', 'Ocurrió un error al enviar tu información.');
          this.submitting = false;
        }
      });
  }

  private submitContact(): void {
    const name = this.contact.name.trim();
    const email = this.contact.email.trim();
    const messageBody = this.contact.message.trim();
    if (!name || !email || !messageBody || !this.contact.privacy) {
      this.triggerShake();
      return;
    }
    const subjectLabel =
      this.subjects.find((s) => s.value === this.contact.subject)?.label || this.contact.subject;
    const message = subjectLabel ? `[${subjectLabel}] ${messageBody}` : messageBody;
    const payload = {
      name,
      fatherlastname: 'vacio',
      motherlastname: 'vacio',
      email,
      telephone: '0',
      ocupacion: '0',
      url: this.currentUrl(),
      message
    };
    this.submitting = true;
    const finishOk = () => {
      void swalToast('success', 'Gracias por tus datos, en un momento un asesor se comunicará contigo.');
      this.submitting = false;
      this.step = this.totalSteps;
      this.animDir = 'forward';
    };
    if (this.isLocalHost()) {
      console.info('[ContactUs/home] POST skipped on local hostname', payload);
      finishOk();
      return;
    }
    this.http
      .post(this.contactUsUrl, payload, { headers: { 'Content-Type': 'application/json' } })
      .subscribe({
        next: () => finishOk(),
        error: (err) => {
          console.error(err);
          void swalToast('error', 'No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.');
          this.submitting = false;
        }
      });
  }
}
