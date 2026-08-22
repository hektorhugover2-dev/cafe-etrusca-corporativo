import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollWaveComponent } from '../../shared/ui/scroll-wave/scroll-wave.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ScrollWaveComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}