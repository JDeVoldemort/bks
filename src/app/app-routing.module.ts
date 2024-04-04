import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { InventoryDetailComponent } from './inventory/inventory-detail/inventory-detail.component';
import { InventoryEditComponent } from './inventory/inventory-edit/inventory-edit.component';
import { InventoryComponent } from './inventory/inventory.component';
import { RequestListComponent } from './requests/request-list/request-list.component';

import { FavoritesDetailComponent } from './favorites/favorites-detail/favorites-detail.component';
import { FavoritesEditComponent } from './favorites/favorites-edit/favorites-edit.component';
const appRoutes: Routes = [
  { path: '', redirectTo: '/inventory', pathMatch: 'full'},
  {
    path: 'inventory',
    component: InventoryComponent, children: [
      { path: 'new', component: InventoryEditComponent},
      { path: ':id', component: InventoryDetailComponent},
      { path: ':id/edit', component: InventoryEditComponent}
    ]
  },
  { path: 'requests', component: RequestListComponent
 },
  { path: 'favorites', component: FavoritesComponent, children: [
    { path: 'new', component: FavoritesEditComponent},
    { path: ':id', component: FavoritesDetailComponent},
    { path: ':id/edit', component: FavoritesEditComponent}
  ]
  }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
