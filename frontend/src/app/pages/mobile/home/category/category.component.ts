import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() card: any;

  constructor() { }

  ngOnInit() { }
  isInputFocused: boolean = false;

  onInputFocus(event: FocusEvent): void {
    this.isInputFocused = true;
  }

  onInputBlur(event: FocusEvent): void {
    this.isInputFocused = false;
  }

  selectedCategory: string | null = null;

  toggleCategory(category: string): void {
    console.log('Category clicked:', category);
    if (this.selectedCategory !== category) {
      this.selectedCategory = category;
      console.log('Category icon:', this.selectedCategory);
    }
  }

}
