import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EduNavComponent } from '../../components/edu-nav/edu-nav.component';
import { EduCtaComponent } from '../../components/edu-cta/edu-cta.component';
import {
  AUDIENCE,
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

@Component({
  selector: 'app-education-category-page',
  standalone: true,
  imports: [RouterLink, EduNavComponent, EduCtaComponent],
  templateUrl: './education-category-page.component.html',
  styleUrls: ['../../edu-theme.scss']
})
export class EducationCategoryPageComponent implements OnInit {
  cat: EduCategory | null = null;
  courses: Course[] = [];
  learn = LEARN_ITEMS;
  method = METHODOLOGY;
  faq = FAQ;
  audience = AUDIENCE;
  kinds = EDU_NAV;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((p) => {
      const found = categoryBySlug(p.get('kind'));
      if (!found) {
        this.router.navigate(['/educacion']);
        return;
      }
      this.cat = found;
      this.courses = coursesByKind(found.slug as EduKind);
    });
  }
}
