import { Component } from '@angular/core';
import { Inventory } from './inventory.model';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  selectedInventoryItem!: Inventory;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.inventoryItemSelectedEvent.subscribe(
      (inventory: Inventory) => {
        this.selectedInventoryItem = inventory;
      }
    );
  }
}
