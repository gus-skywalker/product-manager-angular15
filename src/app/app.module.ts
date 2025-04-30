import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CategoryCreateComponent } from './components/category-create/category-create.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    CategoryCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // Angular Material Modules
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
    // end Angular Material Modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
