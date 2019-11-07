import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/to-do-list",
    pathMatch: "full"
  },
  {
    path: "to-do-list",
    loadChildren:
      "./modules/to-do-list/to-do-list.module#ToDoListModule"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
