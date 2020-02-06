import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  public title:string;
  public products: Product[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService
  ) {
    this.title = 'Listado de productos';
   }


  ngOnInit() {
    console.log('product-list.component.ts cargado.');

    this._productService.getProducts().subscribe(
      
      result => {
        if(result.code != 200){
          console.log(result);
        }else{
          this.products = result.data;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
