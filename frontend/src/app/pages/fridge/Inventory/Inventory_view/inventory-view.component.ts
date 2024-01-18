import { Component, Input, OnInit } from '@angular/core';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.scss']
})

export class InventoryViewComponent implements OnInit {
  @Input() items: InventoryModel[] = [];
  @Input() category: string = '';

  constructor(
    private inventoryService: InventoryService,
    private socketService: SocketsService
  ) { }

  ngOnInit(): void {
    
  }
}
