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

  constructor(private httpservice:MakeupService) {}

  ngOnInit(){
    this.allProductsData();
    // this.allProductsCategory();
  }
    
  allProductsData(){
    this.httpservice.getAllProducts().subscribe((data) => {
      this.allProducts = data;
      // console.log(this.allProducts);
    });
  }
  allProductsCategory(){

    for(var i=0; i < this.allProducts.length; i++){
      this.allCategory.push(this.allProducts[i].category);
    }
    this.allCategory = [...new Set(this.allCategory)];

    this.allCategory =  this.allCategory.filter(String);

      this.allCategory = this.allCategory.filter((x:any) => x != null);
      
    console.log(this.allCategory);
  }

}
