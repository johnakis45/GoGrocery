import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';


@Component({
  selector: 'item-preview',
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.scss']
})
export class ItemPreviewComponent implements OnInit {
  public id: string = '';
  public title: string = '';
  private routeSub: Subscription = new Subscription();
  constructor(private route: ActivatedRoute,
    private socketsService: SocketsService
  ) { }

  @Input() selectedCategory: string = '';

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.InitTitle(this.id);
  }
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

  InitTitle(id: string) {
    if (id == "Fruits_Vegetables") {
      this.title = "Fruits & Vegetables";
    } else if (id == "Cooking_Oils") {
      this.title = "Cooking Oils";
    } else if (id == "Meat_Fish") {
      this.title = "Meat & Fish";
    } else if (id == "Bakery_Snacks") {
      this.title = "Bakery & Snacks";
    } else if (id == "Dairy_Eggs") {
      this.title = "Dairy & Eggs";
    } else if (id == "Beverages") {
      this.title = "Beverages";
    } else if (id == "Hygiene_Sypplies") {
      this.title = "Hygiene Sypplies";
    } else if (id == "Cleaning_Sypplies") {
      this.title = "Cleaning Sypplies";
    } else {
      this.title = "Inventory";
    }
  }
}
