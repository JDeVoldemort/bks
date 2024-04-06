import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})
export class InventoryEditComponent implements OnInit {
  originalInventoryItem!: Inventory;
  inventoryItem!: Inventory;
  editMode: boolean = false;
  id!: string;

  constructor(private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          if (!this.id) {
            this.editMode = false;
            return;
          }

          this.originalInventoryItem = this.inventoryService.getInventoryItem(this.id)!;
          if (!this.originalInventoryItem) {
            this.editMode = false;
            return;
          }

          this.editMode = true;
          this.inventoryItem = JSON.parse(JSON.stringify(this.originalInventoryItem));
        });
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    const newInventoryItem = new Inventory(value.id, value.name, value.pages, value.author, value.publishDate, value.aquireDate, value.publisher, value.edition);
    if (this.editMode === true) {
      this.inventoryService.updateInventoryItem(this.originalInventoryItem, newInventoryItem);
    } else {
      this.inventoryService.addInventoryItem(newInventoryItem);
    }
    this.router.navigate(['/inventory']);
  }
  onCancel() {
    this.router.navigate(['/inventory']);
  }
}
