import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemModel } from 'src/app/global/models/items/item.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';



@Component({
  selector: 'item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.scss']
})
export class ItemPreviewComponent implements OnInit {
  @Input() self!: ItemModel;
  @Output("onClick") clickEmitter: EventEmitter<ItemModel> = new EventEmitter<ItemModel>();

  protected imagePath: string = "\assets\\";

  constructor(private socketsService: SocketsService) { }

  @Input() selectedCategory: string = '';

  ngOnInit(): void { }
  isInputFocused: boolean = false;

  onInputFocus(event: FocusEvent): void {
    this.isInputFocused = true;
  }

  onInputBlur(event: FocusEvent): void {
    this.isInputFocused = false;
  }
}
