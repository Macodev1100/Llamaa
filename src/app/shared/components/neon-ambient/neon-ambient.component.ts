import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-neon-ambient',
  standalone: true,
  template: `
    <div class="neon-ambient" aria-hidden="true">
      <div class="neon-orb neon-orb-purple"></div>
      <div class="neon-orb neon-orb-green"></div>
      <div class="neon-orb neon-orb-pink"></div>
      <div
        class="neon-cursor"
        [style.--mx]="mx() + 'px'"
        [style.--my]="my() + 'px'"
        [class.active]="active()"
      ></div>
      <div class="neon-grid"></div>
      <div class="neon-scan"></div>
    </div>
  `,
  styles: `
    .neon-ambient {
      pointer-events: none;
      position: fixed;
      inset: 0;
      z-index: 0;
      overflow: hidden;
    }

    .neon-orb {
      position: absolute;
      border-radius: 999px;
      filter: blur(60px);
      opacity: 0.35;
      will-change: transform;
      animation: neonFloat 12s ease-in-out infinite;
    }

    .neon-orb-purple {
      top: -8%;
      left: 8%;
      width: min(42vw, 420px);
      height: min(42vw, 420px);
      background: radial-gradient(circle, #7b42f6 0%, transparent 70%);
    }

    .neon-orb-green {
      right: -4%;
      bottom: 8%;
      width: min(36vw, 360px);
      height: min(36vw, 360px);
      background: radial-gradient(circle, #2ecc71 0%, transparent 70%);
      animation-delay: -4s;
      animation-duration: 14s;
    }

    .neon-orb-pink {
      top: 42%;
      left: 48%;
      width: min(28vw, 280px);
      height: min(28vw, 280px);
      background: radial-gradient(circle, #00ff88 0%, transparent 70%);
      opacity: 0.18;
      animation-delay: -7s;
      animation-duration: 16s;
    }

    .neon-cursor {
      position: absolute;
      left: 0;
      top: 0;
      width: 28rem;
      height: 28rem;
      margin-left: -14rem;
      margin-top: -14rem;
      border-radius: 999px;
      background: radial-gradient(
        circle,
        color-mix(in srgb, var(--color-primary) 28%, transparent) 0%,
        color-mix(in srgb, var(--color-accent) 12%, transparent) 35%,
        transparent 70%
      );
      transform: translate3d(var(--mx, -999px), var(--my, -999px), 0);
      opacity: 0;
      transition: opacity 280ms ease;
      mix-blend-mode: screen;
    }

    .neon-cursor.active {
      opacity: 1;
    }

    .neon-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(color-mix(in srgb, var(--color-primary) 10%, transparent) 1px, transparent 1px),
        linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 10%, transparent) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse at center, black 10%, transparent 72%);
      opacity: 0.22;
      animation: neonGridPulse 8s ease-in-out infinite;
    }

    .neon-scan {
      position: absolute;
      left: 0;
      right: 0;
      height: 18%;
      background: linear-gradient(
        to bottom,
        transparent,
        color-mix(in srgb, var(--color-accent) 8%, transparent),
        transparent
      );
      animation: neonScan 9s linear infinite;
      opacity: 0.45;
    }

    @keyframes neonFloat {
      0%,
      100% {
        transform: translate3d(0, 0, 0) scale(1);
      }
      50% {
        transform: translate3d(24px, -30px, 0) scale(1.08);
      }
    }

    @keyframes neonGridPulse {
      0%,
      100% {
        opacity: 0.14;
      }
      50% {
        opacity: 0.28;
      }
    }

    @keyframes neonScan {
      0% {
        transform: translateY(-30%);
      }
      100% {
        transform: translateY(560%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .neon-orb,
      .neon-grid,
      .neon-scan {
        animation: none;
      }

      .neon-cursor {
        display: none;
      }
    }
  `,
})
export class NeonAmbientComponent implements OnInit, OnDestroy {
  readonly mx = signal(-999);
  readonly my = signal(-999);
  readonly active = signal(false);

  private reducedMotion = false;

  ngOnInit(): void {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  ngOnDestroy(): void {
    this.active.set(false);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (this.reducedMotion) {
      return;
    }
    this.mx.set(event.clientX);
    this.my.set(event.clientY);
    this.active.set(true);
  }

  @HostListener('document:pointerleave')
  onPointerLeave(): void {
    this.active.set(false);
  }
}
