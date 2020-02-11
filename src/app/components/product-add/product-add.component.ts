import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../services/product.service'; //1 Importamos lo necesario 
import { Product } from '../models/product';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [ProductService]
})
export class ProductAddComponent implements OnInit {
  //2 definimos propiedades basicas
  public title:string;
  // 5 Definimos el product
  public product: Product;
  public filesToUpload;
  public resultUpload;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.title = 'Enviar';
    this.product = new Product(0, '', '', 0, ''); //6 Creamos la propiedad producto para vincular al form
  }

  ngOnInit() {
    console.log('product-add.component.ts cargado.');
  }

  onSubmit(){
    console.log(this.product);
    
    console.log(this.filesToUpload.length);
      
      if(this.filesToUpload && this.filesToUpload.length >= 1){
        this._productService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
          console.log(result);
          this.resultUpload = result;
          this.product.imagen = this.resultUpload.filename;
          this.saveProduct();
        }, (error) => {
          console.log(error);
        });
      }else{
        this.saveProduct();
      }

      
  }

  saveProduct(){
    this._productService.addProduct(this.product).subscribe(
      response => {
        if(response.code == 200){
          this._router.navigate(['/products']);
        }else{
          console.log(response);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

}
