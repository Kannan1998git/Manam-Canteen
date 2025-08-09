import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 menuActive = false;
  isScrolled = false;
  isBrowser: boolean;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.loadingAnimation();
    }
 
  }

  toggleMenu(): void {
    this.menuActive = !this.menuActive;
    if (this.isBrowser) {
      document.body.style.overflow = this.menuActive ? 'hidden' : 'auto';
    }
  }

  closeMenu(): void {
    this.menuActive = false;
    if (this.isBrowser) {
      document.body.style.overflow = 'auto';
    }
  }

  onMobileLinkClick(event: Event): void {
    event.preventDefault();
    const target = (event.target as HTMLAnchorElement).getAttribute('href');
    if (target?.startsWith('#') && this.isBrowser) {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeMenu();
  }

  loadingAnimation(): void {
    if (!this.isBrowser) return;

    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.style.opacity = '0';
      navbar.style.transform = 'translateY(-100%)';

      setTimeout(() => {
        navbar.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  // Only run on browser
  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(): void {
    if (this.isBrowser && this.menuActive) {
      this.closeMenu();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.isBrowser) {
      this.isScrolled = window.pageYOffset > 50;
    }
  }
}
