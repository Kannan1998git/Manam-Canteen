import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import * as AOS from 'aos';
interface FoodCategory {
  id: number;
  name: string;
  image: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnInit {
 @ViewChild('scrollContainer') scrollContainer!: ElementRef;
 currentIndex = 0;
  private slideInterval: any;

  slides = [
    {
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80',
      alt: 'Modern Korean Restaurant Interior',
      title: 'Dine-In',
      description: 'Step into Manam Canteen, enjoy your favourite dishes in a cozy, family-friendly space that feels just like home. Come hungry, leave happy.'
    },
    {
      image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=2070&q=80',
      alt: 'Special Dish',
      title: 'Special Dishes',
      description: 'Explore our chef’s special dishes prepared with love and fresh ingredients every day.'
    }
  ];
  isAtStart = true;
  isAtEnd = false;

  // Removed duplicate constructor

  categories: FoodCategory[] = [
    {
      id: 1,
      name: 'Briyani',
      image: 'assets/manam_menu/Briyani.svg'
    },
    {
      id: 2,
      name: 'Dosa',
      image: 'assets/manam_menu/Dosai.svg'
    },
    {
      id: 3,
      name: 'Indian Breads',
      image: 'assets/manam_menu/Indian_Breads.svg'
    },
    {
      id: 4,
      name: 'Meals',
      image: 'assets/manam_menu/Meals.svg'
    },
    {
      id: 5,
      name: 'Vada & Idly',
      image: 'assets/manam_menu/Vadai_Idly.svg'
    },

 
  ];
  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
      });
      
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateScrollState();
    });
    
    this.scrollContainer.nativeElement.addEventListener('scroll', () => {
      this.updateScrollState();
    });
  }

  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    container.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(() => {
    this.checkAndAppendCategories();
  }, 300);

  }

  private updateScrollState() {
    const container = this.scrollContainer.nativeElement;
    const newIsAtStart = container.scrollLeft <= 0;
    const newIsAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1; // Adding 1px tolerance
    
    // Only update if values actually changed to prevent unnecessary change detection
    if (this.isAtStart !== newIsAtStart || this.isAtEnd !== newIsAtEnd) {
      this.isAtStart = newIsAtStart;
      this.isAtEnd = newIsAtEnd;
      this.cdr.detectChanges();
    }
  }
  private checkAndAppendCategories() {
  const container = this.scrollContainer.nativeElement;
  const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1;

  if (isAtEnd) {
    const newItems = this.categories.slice(); // clone current items
    this.categories = [...this.categories, ...newItems];
    this.cdr.detectChanges(); // ensure view updates
  }
}

}
