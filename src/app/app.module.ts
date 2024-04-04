import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../app/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoritesDetailComponent } from './favorites/favorites-detail/favorites-detail.component';
import { FavoritesEditComponent } from './favorites/favorites-edit/favorites-edit.component';
import { FavoritesItemComponent } from './favorites/favorites-item/favorites-item.component';
import { FavoritesListComponent } from './favorites/favorites-list/favorites-list.component';
// import { FavoritesFilterPipe } from './favorites/favorites-filter.pipe';
import { FavoritesComponent } from './favorites/favorites.component';
import { FavoritesService } from './favorites/favorites.service';
import { InventoryDetailComponent } from './inventory/inventory-detail/inventory-detail.component';
import { InventoryEditComponent } from './inventory/inventory-edit/inventory-edit.component';
import { InventoryItemComponent } from './inventory/inventory-item/inventory-item.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { InventoryComponent } from './inventory/inventory.component';
import { InventoryService } from './inventory/inventory.service';
import { RequestEditComponent } from './requests/request-edit/request-edit.component';
import { RequestItemComponent } from './requests/request-item/request-item.component';
import { RequestListComponent } from './requests/request-list/request-list.component';
import { RequestsService } from './requests/requests.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { WindRefService } from './wind-ref.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FavoritesComponent,
    FavoritesListComponent,
    FavoritesDetailComponent,
    FavoritesItemComponent,
    InventoryComponent,
    InventoryListComponent,
    InventoryItemComponent,
    InventoryDetailComponent,
    RequestItemComponent,
    RequestEditComponent,
    RequestListComponent,
    DropdownDirective,
    InventoryEditComponent,
    FavoritesEditComponent,
    // FavoritesFilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // DragDropModule,
    HttpClientModule
    // DndModule.forRoot()
  ],
  providers: [FavoritesService, InventoryService, WindRefService, RequestsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
