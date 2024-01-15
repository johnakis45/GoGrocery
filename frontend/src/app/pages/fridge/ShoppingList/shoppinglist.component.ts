import { Component, OnInit,  Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'fridge-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppingListComponent implements OnInit {
  private routeSub: Subscription = new Subscription();
  constructor(private route: ActivatedRoute,
    private socketsService: SocketsService
  ) { }

  @Input() selectedCategory: string = '';

  ngOnInit(): void {}
  isInputFocused: boolean = false;

  onInputFocus(event: FocusEvent): void {
    this.isInputFocused = true;
  }

  onInputBlur(event: FocusEvent): void {
    this.isInputFocused = false;
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }


}
