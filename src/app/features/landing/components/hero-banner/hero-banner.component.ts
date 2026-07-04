import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-beams" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="hero-copy">
          <p class="hero-kicker">Rydex Store Industries</p>
          <h1>LO MEJOR DEL <span>GAMING</span></h1>
          <p class="hero-sub">Consolas, juegos y accesorios a los mejores precios.</p>
          <a routerLink="/catalog" class="hero-cta">Ver Productos</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      padding: 1rem 1rem 0;
    }

    @media (min-width: 640px) {
      .hero {
        padding: 1.25rem 1.25rem 0;
      }
    }

    .hero-inner {
      position: relative;
      overflow: hidden;
      border-radius: 1rem;
      min-height: 14rem;
      display: flex;
      align-items: center;
      padding: 1.75rem;
      border: 1px solid color-mix(in srgb, var(--color-primary) 35%, var(--color-border));
      box-shadow:
        0 0 0 1px color-mix(in srgb, var(--color-primary) 12%, transparent),
        0 0 40px color-mix(in srgb, var(--color-primary) 18%, transparent),
        inset 0 0 40px color-mix(in srgb, var(--color-primary) 8%, transparent);
      background:
        linear-gradient(90deg, rgb(11 14 20 / 0.9) 0%, rgb(11 14 20 / 0.45) 55%, rgb(11 14 20 / 0.25) 100%),
        url('/assets/hero-banner.jpeg') right center / cover no-repeat,
        linear-gradient(135deg, #1a1040, #0b0e14);
    }

    @media (min-width: 768px) {
      .hero-inner {
        min-height: 17rem;
        padding: 2.25rem 2.5rem;
      }
    }

    .hero-beams {
      pointer-events: none;
      position: absolute;
      inset: 0;
    }

    .hero-beams span {
      position: absolute;
      width: 2px;
      height: 140%;
      top: -20%;
      background: linear-gradient(
        to bottom,
        transparent,
        color-mix(in srgb, var(--color-accent) 70%, transparent),
        transparent
      );
      filter: blur(1px);
      opacity: 0.45;
      animation: beamMove 5s linear infinite;
    }

    .hero-beams span:nth-child(1) {
      left: 18%;
      animation-duration: 4.5s;
    }

    .hero-beams span:nth-child(2) {
      left: 48%;
      animation-duration: 6s;
      animation-delay: -1.5s;
      background: linear-gradient(
        to bottom,
        transparent,
        color-mix(in srgb, var(--color-primary) 75%, transparent),
        transparent
      );
    }

    .hero-beams span:nth-child(3) {
      left: 78%;
      animation-duration: 5.2s;
      animation-delay: -2.5s;
    }

    .hero-copy {
      position: relative;
      z-index: 1;
      max-width: 30rem;
    }

    .hero-kicker {
      margin: 0 0 0.45rem;
      font-size: 0.75rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-primary-glow);
      text-shadow: 0 0 12px color-mix(in srgb, var(--color-primary) 45%, transparent);
    }

    .hero-copy h1 {
      margin: 0;
      font-size: clamp(1.5rem, 3vw, 2.45rem);
      font-weight: 800;
      letter-spacing: 0.04em;
      line-height: 1.1;
      color: #fff;
      text-shadow:
        0 0 12px color-mix(in srgb, var(--color-primary) 35%, transparent),
        0 0 28px color-mix(in srgb, var(--color-primary) 20%, transparent);
    }

    .hero-copy h1 span {
      color: var(--color-accent);
      text-shadow:
        0 0 12px color-mix(in srgb, var(--color-accent) 55%, transparent),
        0 0 28px color-mix(in srgb, var(--color-accent) 30%, transparent);
    }

    .hero-sub {
      margin: 0.7rem 0 1.2rem;
      color: var(--color-text-muted);
      font-size: 0.95rem;
    }

    .hero-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      background: var(--color-accent);
      color: #04120a;
      font-weight: 700;
      font-size: 0.9rem;
      padding: 0.72rem 1.4rem;
      box-shadow: 0 0 22px color-mix(in srgb, var(--color-accent) 45%, transparent);
      transition:
        filter 160ms ease,
        transform 160ms ease,
        box-shadow 160ms ease;
    }

    .hero-cta:hover {
      filter: brightness(1.08);
      transform: translateY(-2px);
      box-shadow: 0 0 32px color-mix(in srgb, var(--color-accent) 65%, transparent);
    }

    @keyframes beamMove {
      0% {
        transform: translateY(-10%) rotate(12deg);
        opacity: 0;
      }
      20%,
      80% {
        opacity: 0.5;
      }
      100% {
        transform: translateY(20%) rotate(12deg);
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .hero-beams span {
        animation: none;
        opacity: 0.25;
      }
    }
  `,
})
export class HeroBannerComponent {}
