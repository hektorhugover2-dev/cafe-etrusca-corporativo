import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { EventService } from '../../../../../shared/kernel/services/event.service';
import { EduNavComponent } from '../../components/edu-nav/edu-nav.component';
import { CourseInterestModalComponent } from '../../components/course-interest-modal/course-interest-modal.component';
import { Course, CourseDate, courseBySlug } from '../../education.data';
import { educationCrumbs, breadcrumbJsonLd } from '../../edu-breadcrumb';
import { EDUCATION_HUB_PATH } from '../../course-public-paths';
import { cityPageIndexing } from '../../page-indexing';
import {
  catalogByCourseSlug,
  catalogDuration,
  catalogOffer,
  formatMXN
} from '../../../../../shared/kernel/data/course-catalog.data';
import { SITE_ORIGIN, siteUrl } from '../../../../../shared/kernel/config/site-url';
import {
  CourseBranchLanding,
  EMPRENDE_PATH,
  emprendeLandingPath,
  emprendeSeo,
  findEmprendeBranch
} from './course-branch.data';

@Component({
  selector: 'app-course-branch-page',
  standalone: true,
  imports: [RouterLink, FormsModule, EduNavComponent, CourseInterestModalComponent],
  templateUrl: './course-branch-page.component.html',
  styleUrls: ['../../edu-theme.scss']
})
export class CourseBranchPageComponent implements OnInit, OnDestroy {
  course: Course | null = null;
  landing: CourseBranchLanding | null = null;
  month = '';
  branch = '';
  interestOpen = false;
  interestDate: CourseDate | null = null;
  pageTitle = '';

  private seo = inject(SeoService);
  private events = inject(EventService);
  private document = inject(DOCUMENT);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const city = (data['city'] as string) || this.route.snapshot.paramMap.get('city');
      const found = city ? findEmprendeBranch(city) : null;
      if (city && !found) {
        this.router.navigate(['/cursos-para-baristas-y-talleres-para-cafeterias']);
        return;
      }
      this.landing = found;
      const catalog = courseBySlug('formacion-de-emprendedores');
      if (!catalog) {
        this.router.navigate(['/cursos-para-baristas-y-talleres-para-cafeterias']);
        return;
      }
      this.course = { ...catalog };
      this.month = '';
      this.branch = found?.branchFilter || '';
      this.applySeo();
      this.events.getMappedDatesByCourse(10).subscribe({
        next: (apiDates) => {
          if (!this.course) return;
          this.course.dates = apiDates || [];
          this.applyIndexing();
        }
      });
    });
  }

  ngOnDestroy() {
    this.document.getElementById('course-branch-jsonld')?.remove();
  }

  get months() {
    return [...new Set(this.branchDates.map((d) => d.month))];
  }

  get branchDates(): CourseDate[] {
    const dates = this.course?.dates || [];
    if (!this.landing) return dates;
    const wanted = this.landing.branchFilter.toLowerCase();
    return dates.filter((d) => (d.branch || '').toLowerCase().includes(wanted));
  }

  get filteredDates(): CourseDate[] {
    return this.branchDates.filter(
      (d) => !this.month || d.month === this.month
    );
  }

  clearFilters() {
    this.month = '';
  }

  openInterest(event: Event, date: CourseDate) {
    event.preventDefault();
    event.stopPropagation();
    this.interestDate = date;
    this.interestOpen = true;
  }

  priceText(amount: number): string {
    return formatMXN(amount);
  }

  openInterestEmpty() {
    this.interestDate = {
      days: '',
      month: '',
      branch: this.landing?.branchFilter || '',
      duration: this.course?.duration || '',
      hours: this.course?.hours || 'Consultar horario',
      email: 'educacion@cafeetrusca.com',
      telephone: '(55) 4166 8777',
      locationName: this.landing ? `Sucursal ${this.landing.branchFilter}` : undefined,
      categoryName: 'FORMACIÓN DE EMPRENDEDORES'
    };
    this.interestOpen = true;
  }

  closeInterest() {
    this.interestOpen = false;
  }

  /** D2: the emprende city page without upcoming dates → noindex,follow (page-indexing.ts). */
  private applyIndexing() {
    if (!this.landing) return;
    // Same dates the page lists (branchDates); the prerender gets them from the events snapshot.
    this.seo.setRobots(this.branchDates.length > 0 ? 'index,follow' : 'noindex,follow');
  }

  private applySeo() {
    if (!this.course) return;
    const pack = emprendeSeo(this.landing?.cityLabel);
    this.pageTitle = pack.title;
    // Canonical origin from environment config (never the request host / 127.0.0.1 prerender).
    const origin = SITE_ORIGIN;
    const url = siteUrl(emprendeLandingPath(this.landing?.citySlug));
    const imagePath = this.course.banner || this.course.image || '';
    const image = imagePath.startsWith('http') ? imagePath : `${origin}${imagePath}`;
    this.seo.set({
      title: pack.title + ' | Café Etrusca',
      description: pack.description,
      keywords: pack.keywords,
      image,
      path: emprendeLandingPath(this.landing?.citySlug)
    });
    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    this.setJsonLd(pack.title, pack.description, url, image);
  }

  private setJsonLd(name: string, description: string, url: string, image: string) {
    this.document.getElementById('course-branch-jsonld')?.remove();
    const payload: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name,
      description,
      url,
      image,
      provider: {
        '@type': 'Organization',
        name: 'Café Etrusca',
        url: 'https://cafeetrusca.com/'
      },
      educationalCredentialAwarded: 'Diploma de participación',
      inLanguage: 'es-MX'
    };
    const cat = catalogByCourseSlug('formacion-de-emprendedores');
    if (cat) {
      payload['courseCode'] = cat.clave;
      payload['timeRequired'] = catalogDuration(cat);
      payload['offers'] = catalogOffer(cat, url);
    }
    if (this.landing) {
      payload['location'] = {
        '@type': 'Place',
        name: `Café Etrusca ${this.landing.cityLabel}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: this.landing.branchFilter,
          addressCountry: 'MX'
        }
      };
    }
    const el = this.document.createElement('script');
    el.type = 'application/ld+json';
    el.id = 'course-branch-jsonld';
    el.text = JSON.stringify(payload);
    this.document.head.appendChild(el);
  }
  readonly hubPath = EDUCATION_HUB_PATH;
  /** Emprende landing with every sucursal ("Ver otras sedes" on a city landing without dates). */
  readonly allSedesPath = `/${EMPRENDE_PATH}`;
  get crumbs() {
    const title = this.course?.title || 'Curso';
    return educationCrumbs(title, this.landing?.cityLabel);
  }
}
