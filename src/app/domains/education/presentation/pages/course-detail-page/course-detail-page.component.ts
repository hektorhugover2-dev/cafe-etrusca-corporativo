import { Component, OnInit, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { EduNavComponent } from '../../components/edu-nav/edu-nav.component';
import { CourseInterestModalComponent } from '../../components/course-interest-modal/course-interest-modal.component';
import { Course, CourseDate, courseBySlug, COURSES, upcomingCourseDates } from '../../education.data';
import { coursePublicPath, EDUCATION_HUB_PATH } from '../../course-public-paths';
import { educationCrumbs, breadcrumbJsonLd } from '../../edu-breadcrumb';
import { EventService } from '../../../../../shared/kernel/services/event.service';
import {
  catalogByCourseSlug,
  catalogDuration,
  catalogOffer,
  comboFor,
  comboNote,
  formatMXN
} from '../../../../../shared/kernel/data/course-catalog.data';

@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  imports: [RouterLink, FormsModule, EduNavComponent, CourseInterestModalComponent],
  templateUrl: './course-detail-page.component.html',
  styleUrls: ['../../edu-theme.scss']
})
export class CourseDetailPageComponent implements OnInit {
  course: Course | null = null;
  related: Course[] = [];
  month = '';
  branch = '';
  interestOpen = false;
  interestDate: CourseDate | null = null;

  /** Beneficios fijos de toda "Experiencia" (texto exacto indicado por Héctor). */
  readonly experienceIncludes: readonly string[] = [
    '5% de descuento en accesorios e insumos, sin compra mínima.',
    'Promoción válida únicamente donde se registre la asistencia a la Experiencia.',
    'El descuento sólo podrá utilizarse el mismo día de la inscripción a la Experiencia.',
    'No aplica en productos que ya cuenten con descuentos o promociones vigentes.'
  ];

  private eventService = inject(EventService);
  private seo = inject(SeoService);
  private document = inject(DOCUMENT);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((p) => {
      const slug = p.get('slug') || this.route.snapshot.data['courseSlug'] || null;
      const found = courseBySlug(slug);
      if (!found) {
        this.router.navigate(['/cursos-para-baristas-y-talleres-para-cafeterias']);
        return;
      }
      // /educacion/<kind>/<slug> with the wrong kind (or the emprende course) → canonical path.
      const kind = p.get('kind');
      const canonical = coursePublicPath(found);
      if (kind && canonical !== `/educacion/${kind}/${found.slug}`) {
        this.router.navigateByUrl(canonical, { replaceUrl: true });
        return;
      }

      this.course = { ...found };
      this.related = COURSES.filter(c => c.slug !== found.slug).slice(0, 3);
      this.month = '';
      this.branch = '';
      this.applySeo(this.course);

      if (this.course.id) {
        this.eventService.getMappedDatesByCourse(this.course.id).subscribe({
          next: (apiDates) => {
            // API (or the events snapshot while prerendering) is the source of dates. Sesiones/experiencias
            // keep their static dates (education.data.ts) while the API still returns nothing for the category.
            if (!this.course) return;
            const live = apiDates || [];
            const keepStatic = !live.length && (this.course.kind === 'sesiones' || this.course.kind === 'experiencias');
            if (!keepStatic) this.course.dates = live;
          },
          error: (err) => {
            console.error('Error al cargar fechas desde la API', err);
          }
        });
      }
    });
  }

  /** Official price (SAP table) as "$2,500 MXN". */
  get priceLabel(): string {
    return this.course?.price ? formatMXN(this.course.price) : '';
  }

  /** Combo básico + especializado note (national page: shows the Tijuana exclusion). */
  get combo(): string {
    const combo = comboFor(catalogByCourseSlug(this.course?.slug));
    return combo ? comboNote(combo) : '';
  }

  private applySeo(course: Course) {
    const title = course.seo?.title || `${course.title} | Café Etrusca`;
    const description = course.seo?.description || course.summary;
    const keywords = course.seo?.keywords || '';
    const imagePath = course.banner || course.image || '';
    const cat = catalogByCourseSlug(course.slug);
    this.seo.set({
      title,
      description,
      keywords,
      image: imagePath || undefined,
      ogType: 'article',
      path: coursePublicPath(course),
      jsonLd: ({ origin, url }) => {
        const image = imagePath
          ? imagePath.startsWith('http')
            ? imagePath
            : origin + imagePath
          : undefined;
        const courseLd = {
          '@context': 'https://schema.org',
          '@type': 'Course',
          '@id': url + '#course',
          name: course.title,
          description,
          url,
          image,
          provider: {
            '@type': 'Organization',
            '@id': origin + '/#organization',
            name: 'Café Etrusca',
            url: origin + '/'
          },
          educationalLevel: course.kind,
          inLanguage: 'es-MX',
          ...(cat ? { courseCode: cat.clave, timeRequired: catalogDuration(cat), offers: catalogOffer(cat, url) } : {})
        };
        const crumbs = educationCrumbs(course.title);
        return [courseLd, breadcrumbJsonLd(origin, crumbs, url)];
      }
    });
  }

  /** Fechas vigentes: en sesiones/experiencias oculta automáticamente las que ya pasaron. */
  private get activeDates(): CourseDate[] {
    const dates = this.course?.dates || [];
    if (this.course?.kind === 'sesiones' || this.course?.kind === 'experiencias') return upcomingCourseDates(dates);
    return dates;
  }

  /** Course has upcoming dates at any sucursal (before month/sucursal filters). */
  get hasDates(): boolean {
    return this.activeDates.length > 0;
  }

  get months() {
    return [...new Set(this.activeDates.map((d) => d.month))];
  }

  get branches() {
    return [...new Set(this.activeDates.map((d) => d.branch))];
  }

  get filteredDates(): CourseDate[] {
    return this.activeDates.filter((d) =>
      (!this.month || d.month === this.month) &&
      (!this.branch || d.branch === this.branch)
    );
  }

  clearFilters() {
    this.month = '';
    this.branch = '';
  }

  readonly hubPath = EDUCATION_HUB_PATH;

  get crumbs() {
    return this.course ? educationCrumbs(this.course.title) : [];
  }

  relatedLink(c: Course): string {
    return coursePublicPath(c);
  }

  openInterest(event: Event, date: CourseDate) {
    event.preventDefault();
    event.stopPropagation();
    this.interestDate = date;
    this.interestOpen = true;
  }

  openInterestEmpty() {
    this.interestDate = {
      days: '',
      month: '',
      branch: '',
      duration: this.course?.duration || '',
      hours: this.course?.hours || 'Consultar horario',
      email: 'educacion@cafeetrusca.com',
      telephone: '(55) 4166 8777'
    };
    this.interestOpen = true;
  }

  closeInterest() {
    this.interestOpen = false;
  }
}
