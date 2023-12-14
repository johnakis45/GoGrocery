import { Component, OnInit } from '@angular/core';
import { SocketsService } from 'src/fridge/global/services/sockets/sockets.service';

@Component({
  selector: 'fridge-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppingListComponent implements OnInit {

  constructor(private socketsService: SocketsService) { }

  ngOnInit(): void { }
  isInputFocused: boolean = false;

  onInputFocus(event: FocusEvent): void {
    this.isInputFocused = true;
  }

  onInputBlur(event: FocusEvent): void {
    this.isInputFocused = false;
  }


}
