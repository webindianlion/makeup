import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MakeupService {

  product_type:any="";
  product_category:any="";
  brand:any="";


  

  urlAllProducts:any = "assets/products.json";
  currentQuery:any = `https://makeup-api.herokuapp.com/api/v1/products.json?`;
  constructor( private http:HttpClient) { }
/*************************************************************************/
  getAllProducts(){
    // this.currentQuery = `${this.currentQuery}`.slice(0,54);
    return this.http.get(this.urlAllProducts);
  }
/*************************************************************************/
  getProductsByType(){
    let Pattren = /product_type=.*\b&/g;
    let Pattren1 = /product_type=\b&/g;

    if(this.currentQuery.search(Pattren)){
      
      this.currentQuery = this.currentQuery.replace(Pattren,"");
      this.currentQuery = `${this.currentQuery}`.concat(`product_type=${this.product_type}&`);

    }
    // if(this.currentQuery.search(`product_type=`)==-1){
    //   this.currentQuery = `${this.currentQuery}`+`product_type=${this.product_type}&`;
    // }
    else if(this.currentQuery.search(Pattren1)) {
      this.currentQuery = `${this.currentQuery}`.slice(0,54);
    }
    // else{
    //   this.currentQuery = `${this.currentQuery}`.slice(0,54);
    //   this.currentQuery = `${this.currentQuery}`+`product_type=${this.product_type}&`;
    // }  
    console.log(this.currentQuery);
    return this.http.get(`${this.currentQuery}`)
  }
/*************************************************************************/
  getProductsByCategory(){
    let Pattren = /product_category=.*\b&/g;
    if(this.currentQuery.search(Pattren)){
      
      this.currentQuery = this.currentQuery.replace(Pattren,"");
      this.currentQuery = `${this.currentQuery}`.concat(`product_category=${this.product_category}&`);
    }
    // this.currentQuery = `${this.currentQuery}`.concat(`product_category=${this.product_category}&`);
    console.log(this.currentQuery);
  }
/*************************************************************************/
  getProductsByBrand(){
    this.currentQuery = `${this.currentQuery}`.concat(`brand=${this.brand}&`);
    console.log(this.currentQuery);
  }
/*************************************************************************/
  getFilteredProductsData(){
    let url:any = `${this.currentQuery}product_type=${this.product_type}&product_category=${this.product_category}&brand=${this.brand}`;
    // console.log(url);
    return this.http.get(url);
  }
/*************************************************************************/
}
