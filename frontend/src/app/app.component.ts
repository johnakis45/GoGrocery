import { Component, ElementRef, HostListener, Renderer2, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  public GesturesStr: string[] = [
    "SWIPE_LEFT",
    "SWIPE_UP",
    "SWIPE_DOWN",
    "SWIPE_RIGHT",
    "CIRCLE_CLOCKWISE",
    "CIRCLE_COUNTERCLOCKWISE",
    "PINCH",
  ];

  ngOnInit() {
    (window as any)["electronAPI"].onGesture(
      (arg: any) => {
        console.log("Gesture recognised: ", this.GesturesStr[arg])
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
