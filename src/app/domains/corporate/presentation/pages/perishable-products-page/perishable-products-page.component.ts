import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

@Component({
  selector: 'app-perishable-products-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perishable-products-page.component.html',
  styleUrl: './perishable-products-page.component.scss'
})
export class PerishableProductsPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.set({
      title: 'Política de productos perecederos | Café Etrusca',
      description: 'Política de productos perecederos de Café Etrusca: caducidad, almacenamiento, promociones, cambios, cancelaciones y sucursales.',
      keywords: 'productos perecederos,política de devoluciones,Café Etrusca,caducidad,promociones'
    });
  }
}
