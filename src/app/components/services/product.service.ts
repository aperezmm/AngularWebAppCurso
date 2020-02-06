import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import { GLOBAL } from './global';

@Injectable()
export class ProductService{
    public url:string;

    constructor(
        public _http: Http
    ){
        this.url = GLOBAL.url;
    }

    getProducts(){
        return this._http.get(this.url+'productos').map(res => res.json()); //Petición al servicio rest
    }

    addProduct(product: Product){
        let json = JSON.stringify(product); //Lo convertimos a variable JSON para poder enviarlo
        let params = 'json='+json; //Parametro que recibe el backend
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'}); //De esta manera 
        //se procesa la información en el backend que le llega por post (al estar echo en php)

        return this._http.post(this.url+'productos', params, {headers: headers})
            .map(res => res.json());

    }

    makeFileRequest(url:string, params:Array<string>, files:Array<File>){
        return new Promise((resolve, reject) => {   
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest(); //Nos permite hacer las peticiones AJAX.

            for(var i = 0; i < files.length; i++){
                formData.append('uploads[]', files[i], files[i].name); 
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData); //Enviamos el formulario formData, a la URL que hemos indicado por Post
        });
    }
}