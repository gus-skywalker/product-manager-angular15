// File: src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/v1/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.apiUrl);
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