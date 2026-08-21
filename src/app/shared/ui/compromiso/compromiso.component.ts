import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollWaveComponent } from '../scroll-wave/scroll-wave.component';

@Component({
  selector: 'app-compromiso',
  standalone: true, // Asegúrate de que esté como true si tu proyecto es standalone
  imports: [ScrollWaveComponent],
  templateUrl: './compromiso.component.html',
  styleUrl: './compromiso.component.scss'
})
export class CompromisoComponent implements AfterViewInit, OnDestroy {
  // 1. Buscamos los elementos en el HTML que tengan el identificador #counter
  @ViewChildren('counter') counters!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  // Inyectamos el PLATFORM_ID para saber si estamos en el navegador o en el servidor
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // 2. Se ejecuta una vez que el HTML ya cargó
  ngAfterViewInit() {
    // Validamos que estemos en el navegador del usuario para evitar errores de SSR
    if (isPlatformBrowser(this.platformId)) {
      
      // Creamos el detector de scroll
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Si el número aparece en la pantalla...
          if (entry.isIntersecting) {
            this.startCountUp(entry.target as HTMLElement);
            this.observer?.unobserve(entry.target); // Dejamos de observarlo para que solo se anime una vez
          }
        });
      }, { threshold: 0.5 }); // Se activa cuando el elemento se ve al menos al 50%

      // Asignamos el detector a cada número encontrado
      this.counters.forEach(counter => {
        this.observer?.observe(counter.nativeElement);
      });
    }
  }

  // 3. Limpiamos el detector si el usuario cambia de página para no saturar la memoria
  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // 4. La función matemática que hace que los números suban
  startCountUp(element: HTMLElement) {
    const targetStr = element.getAttribute('data-target');
    if (!targetStr) return;
    
    const target = parseInt(targetStr, 10);
    const duration = 2000; // Duración de 2 segundos
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Efecto de frenado suave al final
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOut * target);

      let displayValue = current.toLocaleString('en-US');
      if (element.hasAttribute('data-prefix')) {
        displayValue = element.getAttribute('data-prefix') + displayValue;
      }
      element.innerText = displayValue;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        let finalValue = target.toLocaleString('en-US');
        if (element.hasAttribute('data-prefix')) {
          finalValue = element.getAttribute('data-prefix') + finalValue;
        }
        element.innerText = finalValue;
      }
    };
    
    window.requestAnimationFrame(step);
  }
}