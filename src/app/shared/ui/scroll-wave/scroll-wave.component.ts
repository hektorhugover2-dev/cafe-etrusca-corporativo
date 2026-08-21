import { Component, HostListener, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-wave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-wave.component.html',
  styleUrl: './scroll-wave.component.scss'
})
export class ScrollWaveComponent {
  // Propiedades que puedes modificar desde el HTML cuando uses la etiqueta
  @Input() fillColor: string = '#ffffff'; // Color por defecto (blanco)
  @Input() position: 'top' | 'bottom' = 'bottom'; // Posición por defecto

  waveOffset = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.waveOffset = (window.scrollY * 0.05) % 50;
    }
  }
}