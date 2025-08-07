import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
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
export class HomeComponent  {
 @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  isAtStart = true;
  isAtEnd = false;

  constructor(private cdr: ChangeDetectorRef) {}

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
