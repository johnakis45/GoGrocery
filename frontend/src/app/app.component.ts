import { Component, ElementRef, HostListener, Renderer2, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private renderer: Renderer2) {}

  public GesturesStr: string[] = [
    "SWIPE_LEFT",
    "SWIPE_UP",
    "SWIPE_DOWN",
    "SWIPE_RIGHT",
    "CIRCLE_CLOCKWISE",
    "CIRCLE_COUNTERCLOCKWISE",
    "PINCH",
  ];

  @ViewChild('scrollableElement', { static: true }) scrollableElement: ElementRef = {} as ElementRef;

  private handleSwipeRightGesture() {
    // Check if the scrollable element is available
    if (this.scrollableElement && this.scrollableElement.nativeElement) {
      const currentScrollPosition = this.scrollableElement.nativeElement.scrollLeft;
      // Scroll 20 pixels to the right
      this.scrollableElement.nativeElement.scrollLeft = currentScrollPosition + 20;
    }
  }

  ngOnInit() {
    (window as any)["electronAPI"].onGesture(
      (arg: any) => {
        console.log("Gesture recognised: ", this.GesturesStr[arg])
        if (this.GesturesStr[arg] === 'SWIPE_RIGHT') {
          this.handleSwipeRightGesture();
        }
      }
    );
  }


  @ViewChild('appReplaceCursor', { static: true }) cursorReplacement: ElementRef = {} as ElementRef;

  @HostListener('mousemove', ['$event'])
  onmousemove(event: MouseEvent) {
    if (this.cursorReplacement.nativeElement) {
      this.cursorReplacement.nativeElement.style.left = event.pageX + 'px';
      this.cursorReplacement.nativeElement.style.top = event.pageY + 'px';
    }
  }
}
