import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './user/add/add.component';
import { ViewComponent } from './user/view/view.component';

const routes: Routes = [
  {path: '' , redirectTo:'user/list', pathMatch:'full'},
  {path:'user/create' , component: AddComponent},
  {path:'user/list' , component: ViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
