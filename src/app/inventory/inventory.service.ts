import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Inventory } from './inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  inventorys: Inventory[] = [];
  @Output() inventoryItemSelectedEvent = new EventEmitter<Inventory>();
  @Output() inventoryItemChangedEvent = new EventEmitter<Inventory[]>();
  inventoryItemListChangedEvent = new Subject<Inventory[]>();

  jsonURL = 'http://localhost:3000/inventory';
  private maxInventoryItemId: number;

  constructor(private httpClient: HttpClient) {
    this.maxInventoryItemId = this.getMaxId();
  }

  getInventoryItems(): Inventory[] {
    this.httpClient
      .get<Inventory[]>(this.jsonURL)
      .subscribe((inventorys: Inventory[]) => {
        this.inventorys = inventorys;
        console.log(this.inventorys);
        console.log(JSON.stringify(this.inventorys));
        this.maxInventoryItemId = this.getMaxId();
        this.sortInventoryItems();
        this.inventoryItemListChangedEvent.next([...this.inventorys.slice()]);
        console.log(this.inventorys);
      });
      console.log(this.inventorys.slice());
    return this.inventorys.slice();
  }

  private sortInventoryItems() {
    this.inventorys.sort((a, b) => a.name.localeCompare(b.name));
  }

  storeInventoryItems() {
    this.httpClient
      .put(this.jsonURL, JSON.stringify(this.inventorys), {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe(() => {
        this.sortInventoryItems();
        this.inventoryItemListChangedEvent.next(this.inventorys.slice());
      });
  }

  getInventoryItem(id: string) {
    return this.inventorys.find(i => i.id=== id);
  }

  getMaxId(): number {
    let maxId = 0;
    for (let inventoryItem of this.inventorys) {
      let currentId = +inventoryItem.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addInventoryItem(newInventoryItem: Inventory) {
    if (!newInventoryItem) return;
    newInventoryItem.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.httpClient
      .post<{ message: string; inventoryItem: Inventory }>(
        this.jsonURL,
        newInventoryItem,
        { headers: headers }).subscribe({
          next: (res) => {
            console.log(res.message);
            this.inventorys.push(res.inventoryItem);
            this.sortInventoryItems();
          }
        })
  }

  updateInventoryItem(originalInventoryItem: Inventory, newInventoryItem: Inventory) {
    if (!originalInventoryItem || !newInventoryItem) {
      return;
    }

    const pos = this.inventorys.findIndex(i => i.id === originalInventoryItem.id);

    if (pos < 0) {
      return;
    }

    // newInventoryItem._id.$oid = originalInventoryItem._id.$oid;

    newInventoryItem.id = originalInventoryItem.id;

    newInventoryItem._id = originalInventoryItem._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});


    // Update database by sending HTTPl PUT request

    this.httpClient.put(`${this.jsonURL}/${newInventoryItem.id}`,
      newInventoryItem, { headers: headers })
      .subscribe(
        () => {
          this.inventorys[pos] = newInventoryItem;
          this.sortInventoryItems();
        }
      );
  }

  deleteInventoryItem(inventoryItem: Inventory) {
    if (!inventoryItem) {
      return;
    }
    const pos = this.inventorys.indexOf(inventoryItem);

    if (pos < 0) {
      return;
    }

    this.httpClient.delete(`${this.jsonURL}/${inventoryItem.id}`)
      .subscribe(
        () => {
          this.inventorys.splice(pos, 1);
          this.sortInventoryItems();
        }
      )
  }
}
