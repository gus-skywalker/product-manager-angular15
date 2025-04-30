import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryCreateRequest, CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      parentId: ['']
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      const newCategory: CategoryCreateRequest = {
        name: formValue.name,
        parentId: formValue.parentId || undefined
      };

      this.categoryService.createCategory(newCategory).subscribe(() => {
        this.router.navigate(['/categories']); // ou onde desejar
      });
    }
  }
}
