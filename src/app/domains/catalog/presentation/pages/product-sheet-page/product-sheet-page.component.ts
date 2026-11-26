import { Component, TransferState, inject, makeStateKey } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { siteAssetUrl, siteUrl } from '../../../../../shared/kernel/config/site-url';
import { accentCatalogName } from '../../../../../shared/ui/catalog-name.pipe';
import { BuyModalService } from '../../components/buy-modal/buy-modal.service';
import { STORE_BASE } from '../../services/store-links';
import { productSheetPath, type ProductSheet } from '../../product-sheets/product-sheet.model';
import { PRODUCT_SHEET_LOOKUP } from '../../product-sheets/product-sheet.token';

/**
 * Ficha de producto en la URL del sitio anterior: /Producto/Detalle/<CÓDIGO>/<SLUG>/.
 * Indexable y prerenderizada (una por SKU con foto), sin enlaces desde home, menú ni listados.
 * Sin precios ni promociones: CTA "Comprar" (modal de compra del sitio, con el SKU) y "Calcula tu precio".
 * Guía Lizbeth: Poppins, navy #070C3B, mucho aire, producto recortado, CTA claro.
 */
@Component({
  selector: 'app-product-sheet-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-sheet-page.component.html',
  styleUrls: ['./product-sheet-page.component.scss']
})
export class ProductSheetPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seo = inject(SeoService);
  private transfer = inject(TransferState);
  private lookup = inject(PRODUCT_SHEET_LOOKUP, { optional: true });
  private buyModal = inject(BuyModalService);

  readonly calcPath = '/calculadora-de-precios';
  readonly p: ProductSheet | null;
  readonly name: string;
  readonly brand: string;

  constructor() {
    const code = (this.route.snapshot.paramMap.get('codigo') || '').trim().toUpperCase();
    const key = makeStateKey<ProductSheet | null>('product-sheet-' + code);
    let p = this.transfer.get(key, null);
    if (!p && this.lookup) {
      p = this.lookup(code);
      if (p) this.transfer.set(key, p);
    }
    this.p = p;
    this.name = p ? accentCatalogName(p.n) : '';
    this.brand = p ? brandLabel(p.b) : '';
    if (p) this.setSeo(p);
    // Código sin ficha (no prerenderizado): mismo destino que la ruta '**' del sitio.
    else this.router.navigateByUrl('/', { replaceUrl: true });
  }

  /** "Comprar" → el mismo modal de compra del sitio, con el SKU de la ficha (busca su ficha en la tienda). */
  buy(ev: Event): void {
    const p = this.p;
    if (!p) return;
    this.buyModal.open(
      {
        title: this.name,
        brand: this.brand || undefined,
        sku: p.c,
        lookup: { query: lookupQuery(p.n), code: p.c },
        fallbackUrl: STORE_BASE,
        fallbackLabel: 'el inicio de la tienda'
      },
      ev
    );
  }

  private setSeo(p: ProductSheet): void {
    const path = productSheetPath(p);
    const url = siteUrl(path);
    const image = siteAssetUrl(p.img);
    const by = this.brand ? ` de ${this.brand}` : '';
    const description =
      `${this.name}${by}. SKU ${p.c}, categoría ${p.cl.toLocaleLowerCase('es-MX')}. ` +
      'Cómpralo en Café Etrusca en línea o en sucursal y calcula tu precio.';
    const product: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': url + '#product',
      name: this.name,
      sku: p.c,
      url,
      image: [image],
      category: p.cl,
      description
    };
    if (this.brand) product['brand'] = { '@type': 'Brand', name: this.brand };
    if (p.g) product[gtinKey(p.g)] = p.g;
    this.seo.set({
      title: `${this.name} | Café Etrusca`,
      description,
      path,
      image,
      imageAlt: this.name,
      imageWidth: p.w,
      imageHeight: p.h,
      robots: 'index,follow',
      jsonLd: [
        product,
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl('/') },
            { '@type': 'ListItem', position: 2, name: p.cl, item: siteUrl(p.cp) },
            { '@type': 'ListItem', position: 3, name: this.name, item: url }
          ]
        }
      ]
    });
  }
}

/** Marca tal como la trae la API, sin sufijos societarios ("ANFIM srl" → "ANFIM"). */
function brandLabel(b: string): string {
  return String(b || '').replace(/\s+(s\.?r\.?l\.?|s\.?a\.?(\s+de\s+c\.?v\.?)?)$/i, '').trim();
}

/** /api/Product busca por palabras: las 3 primeras del nombre bastan para encontrar el código (verificado). */
function lookupQuery(name: string): string {
  return String(name || '').split(/\s+/).filter(Boolean).slice(0, 3).join(' ');
}

function gtinKey(g: string): string {
  return g.length === 8 ? 'gtin8' : g.length === 12 ? 'gtin12' : g.length === 13 ? 'gtin13' : 'gtin14';
}
