import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { swalToast } from '../../../../../shared/kernel/utils/swal-toast';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SedeMapComponent } from '../../../../../shared/ui/sede-map/sede-map.component';
import {
  BRANCHES,
  CITIES,
  LOCATORS,
  type Branch,
  type Locator, DISTRIBUTORS } from './contacto.data';

const CONTACT_US_URL = 'https://cafeetrusca.com/api/ContactUs';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ScrollWaveComponent, SedeMapComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit {
  private seo = inject(SeoService);
  private http = inject(HttpClient);
  private document = inject(DOCUMENT);

  readonly cities = CITIES;
  readonly branches = BRANCHES;
  readonly locators = LOCATORS;
  readonly locatorKinds: Array<'Todos' | Locator['kind']> = [
    'Todos',
    'Sucursal',
    'CEDIS',
    'Distribuidor'
  ];

  locatorFilter: 'Todos' | Locator['kind'] = 'Todos';

  /** Sedes del mapa: sucursales + distribuidores (el componente filtra por tipo y estado). */
  readonly mapPlaces: Branch[] = [...BRANCHES, ...DISTRIBUTORS];
  currentBranch: Branch | null = null;

  name = '';
  telephone = '';
  email = '';
  message = '';
  ocupacion = '0';
  nickname = '';
  privacy = false;
  submitting = false;
  successMessage = '';
  errorMessage = '';
  luckyWriting = false;

  ngOnInit() {
    const brand = 'Café Etrusca';
    this.seo.set({
      title: 'Contacto | ' + brand + ' — Sucursales y asesores',
      description:
        'Contacta a ' + brand + ': sucursales, distribuidores y CEDIS. Escríbenos y un asesor te atiende. Tel. (55) 4166 8777.',
      keywords:
        'contacto Café Etrusca, sucursales, distribuidores, CEDIS Vallejo, atención a clientes, mapa sucursales',
      image: '/assets/images/home/banners/banner_home_la_fenice.webp',
      ogType: 'website',
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          '@id': url + '#contact',
          name: 'Contacto | ' + brand,
          url,
          description:
            'Sucursales, distribuidores y formulario de contacto de Café Etrusca.',
          isPartOf: { '@id': origin + '/#website' },
          about: { '@id': origin + '/#organization' }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': origin + '/#organization',
          name: brand,
          url: origin + '/',
          telephone: '+52-55-4166-8777',
          email: 'atencion@cafeetrusca.com',
          logo: origin + '/assets/images/logo-etrusca.webp',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+52-55-4166-8777',
            contactType: 'customer service',
            areaServed: 'MX',
            availableLanguage: ['es']
          }
        }
      ]
    });
    this.applyDefaultCity();
  }

  get visibleLocators(): Locator[] {
    if (this.locatorFilter === 'Todos') return this.locators;
    return this.locators.filter((row) => row.kind === this.locatorFilter);
  }

  telHref(phone: string): string {
    const digits = (phone || '').replace(/[^\d+]/g, '');
    return digits ? 'tel:' + digits : '';
  }

  
  onFormTouch() {
    this.luckyWriting = [this.name, this.telephone, this.email, this.message].some((value) =>
      (value || '').trim().length > 0
    );
  }
onSubmit(form: NgForm) {
  this.successMessage = '';
  this.errorMessage = '';

  // 1. Prevenir crasheos si nickname es undefined/null
  if (this.nickname?.trim()) {
    return; 
  }

  // 2. Validación de HTML y privacidad
  if (!this.privacy || form.invalid) {
    this.errorMessage = 'Revisa los campos y acepta el aviso de privacidad.';
    return;
  }

  // 3. Payload seguro (previene errores de .trim() of undefined)
  const payload = {
    name: this.name?.trim() || '',
    fatherlastname: 'vacio',
    motherlastname: 'vacio',
    email: this.email?.trim() || '',
    telephone: this.telephone?.trim() || '',
    ocupacion: this.ocupacion || '0',
    url: this.document.location?.href || '',
    message: this.message?.trim() || ''
  };

  this.submitting = true;

  // 4. Bloque para Localhost
  if (this.isLocalHost()) {
    console.info('[ContactUs] POST skipped on local hostname', this.document.location?.hostname);
    this.submitting = false;
    void swalToast('success', 'Gracias por tus datos, en un momento un asesor se comunicará contigo.');
    this.successMessage = 'Gracias por tus datos, en un momento un asesor se comunicará contigo.';
    
    this.limpiarFormulario(form);
    return;
  }

  // 5. Petición HTTP a Producción
  this.http
    .post(CONTACT_US_URL, payload, {
      headers: { 'Content-Type': 'application/json' }
    })
    .subscribe({
      next: () => {
        this.submitting = false;
        void swalToast('success', 'Gracias por tus datos, en un momento un asesor se comunicará contigo.');
        this.successMessage = 'Gracias por tus datos, en un momento un asesor se comunicará contigo.';
        
        this.limpiarFormulario(form);
      },
      error: () => {
        this.submitting = false;
        void swalToast('error', 'No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.');
        this.errorMessage = 'No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.';
      }
    });
}

// Método auxiliar para evitar repetir código al reiniciar
private limpiarFormulario(form: NgForm) {
  form.resetForm({ ocupacion: '0', privacy: false, nickname: '' });
  this.ocupacion = '0';
  this.privacy = false;
}

  
  private applyDefaultCity() {
    this.currentBranch = this.branches[0] || null;
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
}
