import { Component, OnInit, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { EduNavComponent } from '../../components/edu-nav/edu-nav.component';
import { CourseInterestModalComponent } from '../../components/course-interest-modal/course-interest-modal.component';
import { Course, CourseDate, courseBySlug, COURSES, upcomingCourseDates } from '../../education.data';
import { EventService } from '../../../../../shared/kernel/services/event.service';

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

  private eventService = inject(EventService);
  private seo = inject(SeoService);
  private document = inject(DOCUMENT);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((p) => {
      const found = courseBySlug(p.get('slug'));
      if (!found) {
        this.router.navigate(['/cursos-para-baristas-y-talleres-para-cafeterias']);
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
            if (apiDates && apiDates.length > 0 && this.course) {
              this.course.dates = apiDates;
            }
          },
          error: (err) => {
            console.error('Error al cargar fechas desde la API', err);
          }
        });
      }
    });
  }

  private applySeo(course: Course) {
    const title = course.seo?.title || `${course.title} | Café Etrusca`;
    const description = course.seo?.description || course.summary;
    const keywords = course.seo?.keywords || '';
    const imagePath = course.banner || course.image || '';
    this.seo.set({
      title,
      description,
      keywords,
      image: imagePath || undefined,
      ogType: 'article',
      jsonLd: ({ origin, url }) => {
        const image = imagePath
          ? imagePath.startsWith('http')
            ? imagePath
            : origin + imagePath
          : undefined;
        return {
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
          inLanguage: 'es-MX'
        };
      }
    });
  }

  /** Fechas vigentes: en sesiones/experiencias oculta automáticamente las que ya pasaron. */
  private get activeDates(): CourseDate[] {
    const dates = this.course?.dates || [];
    if (this.course?.kind === 'sesiones' || this.course?.kind === 'experiencias') return upcomingCourseDates(dates);
    return dates;
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
