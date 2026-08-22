import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EduNavComponent } from '../../components/edu-nav/edu-nav.component';
import { EduCtaComponent } from '../../components/edu-cta/edu-cta.component';
import {
  AUDIENCE,
  Course,
  DATES,
  INCLUDES,
  SYLLABUS,
  courseBySlug,
  COURSES
} from '../../education.data';

@Component({
  selector: 'app-course-detail-page',
  standalone: true,
  imports: [RouterLink, EduNavComponent, EduCtaComponent],
  templateUrl: './course-detail-page.component.html',
  styleUrls: ['../../edu-theme.scss']
})
export class CourseDetailPageComponent implements OnInit {
  course: Course | null = null;
  related: Course[] = [];
  syllabus = SYLLABUS;
  includes = INCLUDES;
  audience = AUDIENCE;
  dates = DATES;
  open = -1;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((p) => {
      const found = courseBySlug(p.get('slug'));
      if (!found) {
        this.router.navigate(['/educacion']);
        return;
      }
      this.course = found;
      this.related = COURSES.filter(c => c.slug !== found.slug).slice(0, 3);
    });
  }
}
