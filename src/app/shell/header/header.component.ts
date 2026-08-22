import { Component, HostListener, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  isScrolled = false;
  isHome = true;
  private sub: Subscription;

  constructor(private router: Router) {
    this.isHome = this.isHomeUrl(this.router.url);
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.isHome = this.isHomeUrl(e.urlAfterRedirects);
      });
  }

  private isHomeUrl(url: string): boolean {
    const path = url.split('?')[0];
    return path === '/' || path === '';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = typeof window !== 'undefined' && window.scrollY > 50;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
