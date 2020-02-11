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
  public confirmado;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService
  ) {
    this.title = 'Listado de productos';
   }


  ngOnInit() {
    console.log('product-list.component.ts cargado.');
    this.getProducts();  
    this.confirmado = null;  
  }

  getProducts(){
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

  borrarConfirm(id){
    this.confirmado = id;
  }

  cancelarConfirm(){
    this.confirmado = null;
  }

  onDeleteProduct(id){
    this._productService.deleteProduct(id).subscribe(
      response =>{
        if(response.code == 200){
          this.getProducts();
        }else{
          alert('Error al borrar el producto');
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
