import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, AfterViewInit, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import * as AOS from 'aos';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';

interface FoodCategory {
  id: number;
  name: string;
  image: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NgbModule,],
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
      bgColor:'#823A2F1A',
      description: 'Step into Manam Canteen, enjoy your favourite dishes in a cozy, family-friendly space that feels just like home. Come hungry, leave happy.'
    },
        {
      image: 'assets/take_out.svg',
      alt: 'Take out',
      bgColor:"#F9E9E7",
      title: 'Take out',

      description: 'In a rush or on the move? Grab your favourite South Indian meals to go! Our takeout service is quick, easy, and always fresh. Perfect for busy workdays, quick lunch breaks, or cozy nights in. Order ahead and pick up with zero hassle.'
    },
    {
      image: 'assets/delievery.svg',
      alt: 'Delivery',
      bgColor:"#DEEDE4",
      title: 'Delivery',
      description: 'Get the taste of South India delivered straight to your door. Order your favourites online and enjoy hot, flavourful meals in the comfort of home. We partner with top delivery platforms for smooth, on-time service. Great food, zero effort.'
    },
      {
      image: 'assets/catering.svg',
      alt: 'Catering',
      title: 'Catering',
      bgColor:"#FDFAE9",
      description: 'Hosting a party, family gathering, or corporate event? Let us bring the bold flavours of South India to your guests. We offer customizable catering options for both vegetarian and non-vegetarian needs. Fresh, delicious, and sure to impress — every event, every time.'
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
    config: NgbCarouselConfig,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  config.showNavigationIndicators = true; 
  config.showNavigationArrows = true; 
  }

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
