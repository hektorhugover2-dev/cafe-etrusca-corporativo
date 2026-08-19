import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necesario para usar [ngClass]

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled = false;

  // Detecta el scroll de la ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Si el usuario baja más de 50px, se activa el estado "scrolled"
    this.isScrolled = window.scrollY > 50;
  }
}