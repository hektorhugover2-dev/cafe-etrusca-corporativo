import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EduNavComponent } from '../../components/edu-nav/edu-nav.component';
import { EduCtaComponent } from '../../components/edu-cta/edu-cta.component';
import {
  AUDIENCE_LISTING,
  Course,
  EDU_NAV,
  EduCategory,
  FAQ,
  LEARN_ITEMS,
  METHODOLOGY,
  categoryBySlug,
  coursesByKind,
  type EduKind
} from '../../education.data';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

@Component({
  selector: 'app-education-category-page',
  standalone: true,
  imports: [RouterLink, EduNavComponent, EduCtaComponent],
  templateUrl: './education-category-page.component.html',
  styleUrls: ['../../edu-theme.scss', './education-category-page.component.scss']
})
export class EducationCategoryPageComponent implements OnInit {
  cat: EduCategory | null = null;
  courses: Course[] = [];
  learn = LEARN_ITEMS;
  method = METHODOLOGY;
  faq = FAQ;
  audience = AUDIENCE_LISTING;
  kinds = EDU_NAV;

  private seo = inject(SeoService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((p) => {
      const found = categoryBySlug(p.get('kind'));
      if (!found) {
        this.router.navigate(['/cursos-para-baristas-y-talleres-para-cafeterias']);
        return;
      }
      this.cat = found;
      this.courses = coursesByKind(found.slug as EduKind);
      this.seo.set({
        title: found.title + ' | Café Etrusca',
        description: found.subtitle || found.body,
        keywords: found.label + ', cursos para barista, talleres para cafeterías, Café Etrusca',
        image: found.heroImage,
        ogType: 'website',
        jsonLd: ({ origin, url }) => [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': url + '#category',
            name: found.title,
            description: found.subtitle || found.body,
            url,
            isPartOf: { '@id': origin + '/#website' },
            about: { '@type': 'Thing', name: found.label }
          }
        ]
      });
    });
  }
}
