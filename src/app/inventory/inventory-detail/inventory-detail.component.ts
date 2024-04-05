import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {
  inventory!: Inventory;
  id!: string;

  constructor(private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['_id.$oid'];
          this.inventory = this.inventoryService.getInventoryItem(this.id)!;
        }
      );
  }

  onEditInventory() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.inventoryService.deleteInventoryItem(this.inventory);
    this.router.navigate(['/inventory']);
  }
}
