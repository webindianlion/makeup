import { Component, OnInit } from '@angular/core';
import { MakeupService } from './makeup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  allProducts:any;
  allCategory:any = [];
  allProduct_Type:any = [];
  allProductTypeData:any;
  noData:boolean=true;

  constructor(private httpservice:MakeupService) {}

  ngOnInit(){
    this.allProductsData();
    // this.allProductsCategory();
    this.allProductsType(); 
  }
    
  allProductsData(){
    this.httpservice.getAllProducts().subscribe((data) => {
      this.allProducts = data;
      this.allProducts = this.allProducts;
      if(this.allProducts.length > 0) {
          this.noData= false;
          this.allProductsType(); 
      }
      // console.log(this.allProducts.length);
    });
  }
  allProductsCategory(){

    for(var i=0; i < this.allProducts.length; i++){
      this.allCategory.push(this.allProducts[i].category);
    }
    this.allCategory = [...new Set(this.allCategory)];

    this.allCategory =  this.allCategory.filter(String);

      this.allCategory = this.allCategory.filter((x:any) => x != null);
      
    // console.log(this.allCategory);
  }

  allProductsType(){

    for(var i=0; i < this.allProducts.length; i++){
      this.allProduct_Type.push(this.allProducts[i].product_type);
    }
    this.allProduct_Type = [...new Set(this.allProduct_Type)];
    // console.log(this.allProduct_Type);
  }

  productsByType(event:any) {
    this.allProducts = [];
    this.noData= true;
    console.log(event.target.value);
    this.httpservice.product_type = event.target.value;
    this.httpservice.getProductsByType().subscribe((data) => {
      this.allProductTypeData = data;
      this.allProductTypeData = this.allProductTypeData;
      this.allProducts = this.allProductTypeData;

      // this.allProducts = this.allProducts.sort((a:any, b:any) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.name > b.name) ? 1 : -1) : -1 );

      this.noData= false;
      // console.log(this.allProductTypeData);
    });
  }

  sortByPrice() {
    // this.allProducts = this.allProducts.sort((a:any, b:any) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.name > b.name) ? 1 : -1) : -1 );

    this.allProducts = this.allProducts.sort((a:any, b:any) => {return a.price - b.price;})
  }

  sortByPriceReverse() {
    // this.allProducts.reverse();
  }
}
