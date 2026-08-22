import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompromisoComponent } from '../../../../../shared/ui/compromiso/compromiso.component';
import { EduNavComponent } from '../../components/edu-nav/edu-nav.component';
import { EduCtaComponent } from '../../components/edu-cta/edu-cta.component';
import {
  BARISTAS,
  EDU_NAV,
  PATHS,
  QUIZ,
  SCA_CERTS,
  THIS_MONTH
} from '../../education.data';

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [RouterLink, CompromisoComponent, EduNavComponent, EduCtaComponent],
  templateUrl: './education-page.component.html',
  styleUrls: ['../../edu-theme.scss']
})
export class EducationPageComponent {
  cats = EDU_NAV;
  month = THIS_MONTH;
  paths = PATHS;
  certs = SCA_CERTS;
  baristas = BARISTAS;
  quiz = QUIZ;
  step = 0;
  votes: string[] = [];

  choose(path: string) {
    this.votes.push(path);
    if (this.step < this.quiz.length - 1) {
      this.step += 1;
    } else {
      this.step = this.quiz.length;
    }
  }

  get result() {
    const tally: Record<string, number> = {};
    for (const v of this.votes) tally[v] = (tally[v] || 0) + 1;
    return Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] || 'cursos';
  }

  resetQuiz() {
    this.step = 0;
    this.votes = [];
  }
}
