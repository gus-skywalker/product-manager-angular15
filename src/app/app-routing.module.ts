import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { GoodbyeComponent } from './components/goodbye/goodbye.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: 'products/create', component: ProductCreateComponent },
      { path: 'products/edit/:id', component: ProductEditComponent },
      { path: 'categories/create', component: CategoryCreateComponent }
    ]
  },
  { path: 'goodbye', component: GoodbyeComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
