import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MakeupService {

  urlAllProducts:any = "http://makeup-api.herokuapp.com/api/v1/products.json";
  constructor( private http:HttpClient) { }

  getAllProducts(){
    return this.http.get(this.urlAllProducts);
  }
}
