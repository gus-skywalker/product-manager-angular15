import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService, ProductDTO } from '../../services/product.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Category, CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: ProductDTO[] = [];
  categories: Category[] = [];

  displayedColumns: string[] = ['name', 'description', 'price', 'available', 'categoryPath', 'actions'];

  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  currentSort = 'name,asc';
  nameFilter: string = '';
  categoryIdFilter?: number;
  availableFilter?: boolean;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
    this.loadProducts();
  }

  loadProducts(): void {
    const [sortField, sortDirection] = this.currentSort.split(',');
  
    this.productService.getProducts({
      page: this.currentPage,
      size: this.pageSize,
      sort: `${sortField},${sortDirection}`,
      name: this.nameFilter || undefined,
      categoryId: this.categoryIdFilter,
      available: this.availableFilter
    }).subscribe(data => {
      this.products = data.content;
      this.totalItems = data.totalElements;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadProducts();
  }

  onSortChange(sort: Sort): void {
    if (sort.direction) {
      this.currentSort = `${sort.active},${sort.direction}`;
      this.loadProducts();
    }
  }

  editProduct(id: number): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  logout(): void {
    this.authService.clear();
    this.router.navigate(['/goodbye']);
  }
  
}
