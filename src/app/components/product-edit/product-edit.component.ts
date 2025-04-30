// File: src/app/services/product.service.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { Category, CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  productId!: number;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService

  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      available: [true, Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategories();
    this.loadProduct();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe(product => {
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        available: product.available,
        categoryPath: product.categoryPath
      });
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      const updatedProduct: Product = {
        name: formValue.name,
        description: formValue.description,
        price: formValue.price,
        available: formValue.available,
        category: {
          id: formValue.categoryId
        }
      };

      this.productService.updateProduct(this.productId, updatedProduct).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}

