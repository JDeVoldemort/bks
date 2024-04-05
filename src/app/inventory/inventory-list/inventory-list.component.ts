import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit, OnDestroy {
  inventorys: Inventory[] = [];
  private subscription!: Subscription;

  constructor(private inventoryService: InventoryService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.inventorys = this.inventoryService.getInventoryItems();
    this.subscription = this.inventoryService.inventoryItemListChangedEvent
      .subscribe(
        (inventoryList: Inventory[]) => {
          this.inventorys = inventoryList;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
