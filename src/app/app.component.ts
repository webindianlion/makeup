import { Component, OnInit } from '@angular/core';
import { MakeupService } from './makeup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  allProducts: any;
  allCategory: any = [];
  allBrands: any = [];
  allProduct_Type: any = [];
  allProductTypeData: any;
  noData: boolean = true;
  singleProductView: boolean = true;
  singleProductData: any;
  singleProductDataIndex: any;
  prevActive: boolean = false;
  nextActive: boolean = false;
  /*************************************************************************/
  constructor(private httpservice: MakeupService) { }
  /*************************************************************************/
  ngOnInit() {
    this.allProductsData();
    // this.allProductsCategory();
    // this.allProductsType(); 
    this.allProductsCategory();
    this.allProductsBrands();
  }
  /*************************************************************************/
  allProductsData() {
    this.httpservice.getAllProducts().subscribe((data) => {
      this.allProducts = data;
      this.allProducts = this.allProducts;
      if (this.allProducts.length > 0) {
        this.noData = false;

        this.allProductsType();
        this.allProductsCategory();
        this.allProductsBrands();
      }
      // console.log(this.allProducts.length);
    });
  }
  /*************************************************************************/
  allProductsCategory() {
    for (var i = 0; i < this.allProducts.length; i++) {
      this.allCategory.push(this.allProducts[i].category);
    }
    this.allCategory = [...new Set(this.allCategory)];
    this.allCategory = this.allCategory.filter(String);
    this.allCategory = this.allCategory.filter((x: any) => x != null);

    // console.log(this.allCategory);
  }
  /*************************************************************************/
  allProductsBrands() {
    for (var i = 0; i < this.allProducts.length; i++) {
      this.allBrands.push(this.allProducts[i].brand);
    }
    this.allBrands = [...new Set(this.allBrands)];
    this.allBrands = this.allBrands.filter(String);
    this.allBrands = this.allBrands.filter((x: any) => x != null);
    // console.log(this.allBrands);
  }
  /*************************************************************************/
  allProductsType() {
    for (var i = 0; i < this.allProducts.length; i++) {
      this.allProduct_Type.push(this.allProducts[i].product_type);
    }
    this.allProduct_Type = [...new Set(this.allProduct_Type)];
    // console.log(this.allProduct_Type);
  }
  /*************************************************************************/
  productsByType(event: any) {
    this.allProducts = [];
    this.noData = true;
    this.httpservice.product_type = event.target.value;
    this.httpservice.getProductsByType().subscribe((data) => {
      this.allProducts = data;
      // this.allProductTypeData = this.allProductTypeData;
      // this.allProducts = this.allProductTypeData;
      // this.allProducts = this.allProducts.sort((a:any, b:any) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.name > b.name) ? 1 : -1) : -1 );
      this.noData = false;
    });
    // console.log(this.allProducts);
  }
  /*************************************************************************/
  sortByPrice() {
    // this.allProducts = this.allProducts.sort((a:any, b:any) => (a.price > b.price) ? 1 : (a.price === b.price) ? ((a.name > b.name) ? 1 : -1) : -1 );

    this.allProducts = this.allProducts.sort((a: any, b: any) => { return a.price - b.price; })
  }
  /*************************************************************************/
  sortByPriceReverse() {
    this.allProducts.reverse();
  }
  /*************************************************************************/
  productsByCategory() {
    this.httpservice.getProductsByCategory();
  }
  /*************************************************************************/
  productsByBrand() {
    // this.httpservice.getFilteredProducts();
  }
  /*************************************************************************/
  getFilteredProducts(event: any) {
    let value = event.target.value;
    let cat = this.allCategory.includes(value);
    let bnd = this.allBrands.includes(value);
    let type = this.allProduct_Type.includes(value);

    if (cat) { this.httpservice.product_category = value };
    if (bnd) { this.httpservice.brand = value };
    if (type) { this.httpservice.product_type = value };

    this.allProducts = [];
    this.noData = true;

    this.httpservice.getFilteredProductsData().subscribe(
      (data) => {
        this.allProducts = data;
        // this.allProducts = this.allProducts.message;
        console.log(this.allProducts);
        this.noData = false;
      });
  }
  /*************************************************************************/
  singleProduct(product: any, i: any) {
    // this.allProducts.length 
    this.nextActive = false;
    this.prevActive = false;
    this.singleProductView = false;
    this.singleProductData = product;
    this.singleProductDataIndex = this.allProducts.indexOf(this.allProducts[i]);
    if (this.singleProductDataIndex == 0) {
      this.prevActive = true;
    }
    else if( this.singleProductDataIndex + 1 == this.allProducts.length) {
      this.nextActive = true;
    }
    console.log(this.singleProductDataIndex );
  }
  /*************************************************************************/
  listProducts() { this.singleProductView = true; }
  /*************************************************************************/
  prevProduct() {
    this.singleProductData = this.allProducts[this.singleProductDataIndex - 1];
    this.singleProductDataIndex -= 1;
    console.log(this.singleProductDataIndex);
     if( this.singleProductDataIndex == 0) {
      this.prevActive = true;
    }
  }
  /*************************************************************************/
  nextProduct() {

    this.singleProductData = this.allProducts[this.singleProductDataIndex + 1];
    this.singleProductDataIndex += 1;
    console.log(this.singleProductDataIndex);
     if( this.singleProductDataIndex + 1 == this.allProducts.length) {
      this.nextActive = true;
    }
  }
  /*************************************************************************/
}
