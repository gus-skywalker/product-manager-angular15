import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id?: number;
  name: string;
  fullPath?: string;
  parent?: {
    id: number;
  };
}

export interface CategoryDTO {
  id: number;
  name: string;
  fullPath: string;
}

export interface CategoryCreateRequest {
  name: string;
  parentId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/api/v1/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(this.apiUrl);
  }

  createCategory(category: CategoryCreateRequest): Observable<CategoryDTO> {
    return this.http.post<CategoryDTO>(this.apiUrl, category);
  }
}
