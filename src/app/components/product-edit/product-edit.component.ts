import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { GLOBAL } from '../services/global';

@Component({
  selector: 'app-product-edit',
  templateUrl: '../product-add/product-add.component.html', //Cargamos la vista
  styleUrls: ['./product-edit.component.css'],
  providers: [ProductService]
})
export class ProductEditComponent implements OnInit {
  public title: string;
  public product: Product;
  public filesToUpload;
  public resultUpload;
  public is_edit;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Editar producto';
    this.product = new Product(1,'','',1,'');
    this.is_edit = true; 
    this.filesToUpload = 0;
   }

  ngOnInit() {
    console.log(this.title);
    this.getProduct(); 
    console.log(this.filesToUpload.length);
  }

  onSubmit(){
    console.log(this.product);
    
    console.log(this.filesToUpload.length);
      
      if(this.filesToUpload && this.filesToUpload.length >= 1){
        this._productService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
          console.log(result);
          this.resultUpload = result;
          this.product.imagen = this.resultUpload.filename;
          this.updateProduct();
        }, (error) => {
          console.log(error);
        });
      }else{
        this.updateProduct();
      }

      
  }

  updateProduct(){
    this._route.params.forEach((params: Params) => {
      let id = params['id']; //Capturar el id de la URL 

        this._productService.editProduct(id, this.product).subscribe(
          response => {
            if(response.code == 200){
              this._router.navigate(['/product/', id]);
            }else{
              console.log(response);
            }
          },
          error => {
            console.log(<any>error);
          }
        );
    });
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
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
