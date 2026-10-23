import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeleccionCard } from '../../seleccion-cards.data';

/** Cards de "Nuestra selección": la card completa es el link; título visible, imagen decorativa. */
@Component({
  selector: 'app-seleccion-cards',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="sel-cards" role="list">
      @for (c of cards(); track c.link) {
        <li>
          <a class="sel-card" [routerLink]="c.link" [style.--sel-bg]="c.color">
            <span class="sel-card__media">
              <img [src]="c.image" alt="" loading="lazy" decoding="async">
            </span>
            <span class="sel-card__title">{{ c.title }}<span class="sel-card__arrow" aria-hidden="true">→</span></span>
          </a>
        </li>
      }
    </ul>
  `,
  styles: [`
    :host { display: block; }
    .sel-cards {
      list-style: none;
      margin: 0 auto;
      padding: 0;
      max-width: 980px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.1rem;
    }
    .sel-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      border-radius: 28px;
      background: var(--sel-bg, #f4eee4);
      color: var(--etrusca-navy-900, #283039);
      text-decoration: none;
      font-family: var(--etrusca-font, 'Poppins', sans-serif);
      padding: 1.2rem 1.2rem 1rem;
      box-shadow: 0 0 0 1px rgba(40, 48, 57, 0.06);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .sel-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 22px rgba(40, 48, 57, 0.14);
    }
    .sel-card:focus-visible {
      outline: 3px solid var(--etrusca-navy-900, #283039);
      outline-offset: 3px;
    }
    .sel-card__media {
      flex: 1;
      min-height: 190px;
      display: grid;
      place-items: center;
    }
    .sel-card__media img {
      max-height: 190px;
      max-width: 100%;
      object-fit: contain;
      filter: drop-shadow(0 10px 14px rgba(0, 0, 0, 0.12));
    }
    .sel-card__title {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.4rem;
      margin-top: 0.8rem;
      font-weight: 700;
      font-size: 1.02rem;
      text-align: center;
      line-height: 1.25;
    }
    .sel-card__arrow { transition: transform 0.2s ease; }
    .sel-card:hover .sel-card__arrow { transform: translateX(3px); }
    @media (max-width: 760px) {
      .sel-cards { grid-template-columns: 1fr; max-width: 420px; }
      .sel-card__media { min-height: 150px; }
      .sel-card__media img { max-height: 150px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .sel-card, .sel-card__arrow { transition: none; }
      .sel-card:hover, .sel-card:hover .sel-card__arrow { transform: none; }
    }
  `]
})
export class SeleccionCardsComponent {
  readonly cards = input.required<SeleccionCard[]>();
}
