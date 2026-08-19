
import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
  // Busca todos los elementos con la etiqueta #counter en el HTML
  @ViewChildren('counter') counters!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
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

    // Asignamos el detector a cada número
    this.counters.forEach(counter => {
      this.observer?.observe(counter.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Función matemática para animar los números suavemente
  startCountUp(element: HTMLElement) {
    const targetStr = element.getAttribute('data-target');
    if (!targetStr) return;
    
    const target = parseInt(targetStr, 10);
    const duration = 2000; // Duración de la animación en milisegundos (2 segundos)
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Efecto "easeOutQuart" (frena suavemente al acercarse al final)
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOut * target);

      // Formatear con comas y agregar el signo "+" si existe
      let displayValue = current.toLocaleString('en-US');
      if (element.hasAttribute('data-prefix')) {
        displayValue = element.getAttribute('data-prefix') + displayValue;
      }
      element.innerText = displayValue;

      // Si no ha terminado, pedir el siguiente cuadro de animación
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // Asegurarse de que el valor final sea exacto
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
