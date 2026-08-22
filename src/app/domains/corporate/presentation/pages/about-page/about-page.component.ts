import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, ScrollWaveComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {
  valores = [
    { label: 'Lealtad', tone: 'blue' },
    { label: 'Honestidad', tone: 'lime' },
    { label: 'Compromiso', tone: 'pink' },
    { label: 'Empatía', tone: 'yellow' },
    { label: 'Innovación', tone: 'orange' }
  ];
}