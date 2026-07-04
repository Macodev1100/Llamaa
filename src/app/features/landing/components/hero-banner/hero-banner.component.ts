import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section #heroRoot class="hero-cinematic relative">
      <div class="hero-sticky sticky top-0 flex min-h-[100svh] items-center overflow-hidden">
        <!-- Capas de fondo -->
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
          <div #orbA class="hero-orb hero-orb-a"></div>
          <div #orbB class="hero-orb hero-orb-b"></div>
          <div #orbC class="hero-orb hero-orb-c"></div>
          <div class="hero-grid"></div>
          <div #vignette class="hero-vignette"></div>
        </div>

        <div
          class="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10
            px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-14"
        >
          <div #copy class="flex flex-col justify-center">
            <p
              #eyebrow
              class="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-brand-accent"
            >
              Nueva temporada
            </p>

            <h1
              class="font-display text-4xl font-bold leading-[1.05] md:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span #line1 class="hero-line block">Equipa tu setup</span>
              <span #line2 class="hero-line block">
                con <span class="text-brand-glow">neón</span>
              </span>
              <span #line3 class="hero-line block text-brand-pink">y potencia</span>
            </h1>

            <p #subtitle class="mt-6 max-w-xl text-base text-ink-muted sm:text-lg">
              GPUs, monitores OLED y periféricos RGB en una experiencia de compra
              cinematográfica. Scroll para descubrir el catálogo.
            </p>

            <div #cta class="mt-8 flex flex-wrap gap-3">
              <a routerLink="/catalog" class="btn-primary">Ver catálogo</a>
              <a routerLink="/catalog" class="btn-secondary">Ofertas destacadas</a>
            </div>
          </div>

          <div #visualWrap class="relative flex items-center justify-center">
            <div
              #visualCard
              class="card-surface relative w-full max-w-lg overflow-hidden p-1 shadow-neon-accent"
            >
              <img
                #heroImage
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1000&h=700&fit=crop"
                alt="Setup gaming premium"
                class="aspect-[4/3] w-full rounded-lg object-cover"
              />
              <div
                #badge
                class="absolute bottom-4 left-4 right-4 rounded-lg border border-border
                  bg-bg/85 p-4 backdrop-blur-md"
              >
                <p class="font-display text-sm text-brand-pink">Destacado</p>
                <p class="font-medium">Builds listos para 1440p / 4K</p>
              </div>
            </div>

            <div
              #floatChip
              class="absolute -left-2 top-8 hidden rounded-full border border-brand/40
                bg-surface/90 px-3 py-1.5 text-xs font-medium text-brand-glow
                shadow-neon backdrop-blur sm:block"
            >
              RTX · OLED · RGB
            </div>
          </div>
        </div>

        <div
          #scrollCue
          class="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center
            gap-2 text-xs uppercase tracking-[0.25em] text-ink-muted"
        >
          <span>Scroll</span>
          <span class="hero-scroll-line"></span>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }

    .hero-cinematic {
      height: 220vh;
    }

    .hero-orb {
      position: absolute;
      border-radius: 9999px;
      filter: blur(40px);
      opacity: 0.55;
      will-change: transform;
    }

    .hero-orb-a {
      top: 8%;
      left: 10%;
      width: min(42vw, 420px);
      height: min(42vw, 420px);
      background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
    }

    .hero-orb-b {
      right: 5%;
      bottom: 10%;
      width: min(36vw, 360px);
      height: min(36vw, 360px);
      background: radial-gradient(circle, var(--color-accent) 0%, transparent 70%);
    }

    .hero-orb-c {
      top: 40%;
      left: 45%;
      width: min(28vw, 280px);
      height: min(28vw, 280px);
      background: radial-gradient(circle, var(--color-accent-2) 0%, transparent 70%);
    }

    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(color-mix(in srgb, var(--color-border) 35%, transparent) 1px, transparent 1px),
        linear-gradient(90deg, color-mix(in srgb, var(--color-border) 35%, transparent) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(ellipse at center, black 20%, transparent 75%);
      opacity: 0.35;
    }

    .hero-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, transparent 35%, var(--color-bg) 90%);
      opacity: 0.85;
    }

    .hero-line {
      will-change: transform, opacity;
    }

    .hero-scroll-line {
      display: block;
      width: 1px;
      height: 36px;
      background: linear-gradient(to bottom, var(--color-primary-glow), transparent);
      animation: scrollPulse 1.6s ease-in-out infinite;
    }

    @keyframes scrollPulse {
      0%,
      100% {
        opacity: 0.35;
        transform: scaleY(0.7);
      }
      50% {
        opacity: 1;
        transform: scaleY(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .hero-cinematic {
        height: auto;
      }

      .hero-scroll-line {
        animation: none;
      }
    }
  `,
})
export class HeroBannerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroRoot', { static: true }) heroRoot!: ElementRef<HTMLElement>;
  @ViewChild('orbA', { static: true }) orbA!: ElementRef<HTMLElement>;
  @ViewChild('orbB', { static: true }) orbB!: ElementRef<HTMLElement>;
  @ViewChild('orbC', { static: true }) orbC!: ElementRef<HTMLElement>;
  @ViewChild('copy', { static: true }) copy!: ElementRef<HTMLElement>;
  @ViewChild('eyebrow', { static: true }) eyebrow!: ElementRef<HTMLElement>;
  @ViewChild('line1', { static: true }) line1!: ElementRef<HTMLElement>;
  @ViewChild('line2', { static: true }) line2!: ElementRef<HTMLElement>;
  @ViewChild('line3', { static: true }) line3!: ElementRef<HTMLElement>;
  @ViewChild('subtitle', { static: true }) subtitle!: ElementRef<HTMLElement>;
  @ViewChild('cta', { static: true }) cta!: ElementRef<HTMLElement>;
  @ViewChild('visualWrap', { static: true }) visualWrap!: ElementRef<HTMLElement>;
  @ViewChild('visualCard', { static: true }) visualCard!: ElementRef<HTMLElement>;
  @ViewChild('heroImage', { static: true }) heroImage!: ElementRef<HTMLImageElement>;
  @ViewChild('badge', { static: true }) badge!: ElementRef<HTMLElement>;
  @ViewChild('floatChip', { static: true }) floatChip!: ElementRef<HTMLElement>;
  @ViewChild('scrollCue', { static: true }) scrollCue!: ElementRef<HTMLElement>;
  @ViewChild('vignette', { static: true }) vignette!: ElementRef<HTMLElement>;

  private readonly host = inject(ElementRef<HTMLElement>);
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      return;
    }

    this.ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

      intro
        .from(this.eyebrow.nativeElement, { y: 24, opacity: 0, duration: 0.7 }, 0.1)
        .from(
          [this.line1.nativeElement, this.line2.nativeElement, this.line3.nativeElement],
          { y: 48, opacity: 0, duration: 0.9, stagger: 0.12 },
          0.2
        )
        .from(this.subtitle.nativeElement, { y: 20, opacity: 0, duration: 0.6 }, 0.55)
        .from(this.cta.nativeElement, { y: 16, opacity: 0, duration: 0.55 }, 0.7)
        .from(
          this.visualCard.nativeElement,
          { y: 60, opacity: 0, scale: 0.92, rotate: -2, duration: 1 },
          0.25
        )
        .from(this.floatChip.nativeElement, { x: -20, opacity: 0, duration: 0.5 }, 0.85)
        .from(this.scrollCue.nativeElement, { opacity: 0, duration: 0.5 }, 1);

      gsap.to(this.orbA.nativeElement, {
        x: 40,
        y: -30,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(this.orbB.nativeElement, {
        x: -30,
        y: 40,
        duration: 7.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(this.orbC.nativeElement, {
        x: 20,
        y: 25,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: this.heroRoot.nativeElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
        },
      });

      scrollTl
        .to(this.copy.nativeElement, { y: -80, opacity: 0.15, ease: 'none' }, 0)
        .to(
          this.visualWrap.nativeElement,
          { y: -40, scale: 1.08, rotate: 2, ease: 'none' },
          0
        )
        .to(this.heroImage.nativeElement, { scale: 1.18, ease: 'none' }, 0)
        .to(this.badge.nativeElement, { y: 30, opacity: 0, ease: 'none' }, 0)
        .to(this.floatChip.nativeElement, { x: -40, opacity: 0, ease: 'none' }, 0)
        .to(this.scrollCue.nativeElement, { opacity: 0, y: 20, ease: 'none' }, 0)
        .to(this.orbA.nativeElement, { x: -120, y: -80, scale: 1.3, ease: 'none' }, 0)
        .to(this.orbB.nativeElement, { x: 100, y: 60, scale: 1.2, ease: 'none' }, 0)
        .to(this.orbC.nativeElement, { scale: 1.5, opacity: 0.2, ease: 'none' }, 0)
        .to(this.vignette.nativeElement, { opacity: 1, ease: 'none' }, 0)
        .to(this.visualCard.nativeElement, { opacity: 0.35, ease: 'none' }, 0.55);
    }, this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
