import { Component, Input, OnInit } from '@angular/core';
import { InventoryModel } from 'src/app/global/models/inventory/inventory.model';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { InventoryService } from 'src/app/global/services/inventory/inventory.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})

export class CategoryViewComponent implements OnInit {
  @Input() items: InventoryModel[] = [];
  @Input() category: string = '';

  constructor(
    private inventoryService: InventoryService,
    private socketService: SocketsService
  ) { }

  ngOnInit(): void {
    
  }
}
