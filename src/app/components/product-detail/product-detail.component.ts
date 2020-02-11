import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; //Rutas
import { ProductService } from '../services/product.service'; //Servicio
import { Product } from '../models/product';//modelo

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})
export class ProductDetailComponent implements OnInit {

  public product: Product;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.getProduct();
    console.log('product-detail.component.ts cargado.');
  }

  getProduct(){
    this._route.params.forEach((params: Params) => {
      let id = params['id']; //Capturar el id de la URL 
      
      this._productService.getProduct(id).subscribe(
        response =>{
          if(response.code == 200){
            this.product = response.data;
          }else{
            this._router.navigate(['/products']);
          }
        },
        error =>{
          console.log(<any>error);
        }
      );
    });
  }

}
