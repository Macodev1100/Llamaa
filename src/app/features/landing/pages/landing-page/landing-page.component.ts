import { Component } from '@angular/core';
import { CategoryShowcaseComponent } from '../../components/category-showcase/category-showcase.component';
import { FeaturedProductsComponent } from '../../components/featured-products/featured-products.component';
import { HeroBannerComponent } from '../../components/hero-banner/hero-banner.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeroBannerComponent, FeaturedProductsComponent, CategoryShowcaseComponent],
  template: `
    <app-hero-banner />
    <app-category-showcase />
    <app-featured-products />
  `,
})
export class LandingPageComponent {}
