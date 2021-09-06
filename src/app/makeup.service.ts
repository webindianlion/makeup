import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MakeupService {

  product_type:any;
  urlAllProducts:any = "assets/products.json";
  constructor( private http:HttpClient) { }

  getAllProducts(){
    return this.http.get(this.urlAllProducts);
  }

  getProductsByType(){
    return this.http.get(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${this.product_type}`);
  }
  
}
