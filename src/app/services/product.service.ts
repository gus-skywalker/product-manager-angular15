// File: src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  category: {
    id: number;
  };
}

export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  categoryPath: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  available: boolean;
  category: {
    id: number;
  };
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) { }

  // getProducts(): Observable<ProductDTO[]> {
  //   return this.http.get<ProductDTO[]>(this.apiUrl);
  // }

  getProducts(params: {
    page?: number;
    size?: number;
    sort?: string;
    name?: string;
    categoryId?: number;
    available?: boolean;
  } = {}): Observable<Page<ProductDTO>> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    });
  
    return this.http.get<Page<ProductDTO>>(this.apiUrl, { params: httpParams });
  }
  
  getProductById(id: number): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductRequest): Observable<any> {
    return this.http.post<ProductDTO>(this.apiUrl, product);
  }

  updateProduct(id: number, product: ProductRequest): Observable<any> {
    return this.http.put<ProductDTO>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}