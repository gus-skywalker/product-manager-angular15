import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product, ProductRequest } from '../../services/product.service';
import { Router } from '@angular/router';
import { Category, CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      available: [true],
      categoryId: ['', Validators.required] // Manually setting the category id
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      const product: ProductRequest = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        available: formData.available,
        category: {
          id: formData.categoryId
        }
      };

      this.productService.createProduct(product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
