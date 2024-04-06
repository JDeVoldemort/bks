import { Component, Input } from '@angular/core';
import { Inventory } from '../inventory.model';

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.css']
})
export class InventoryItemComponent {
  @Input() inventory!: Inventory;
  @Input() index!: number;
}
