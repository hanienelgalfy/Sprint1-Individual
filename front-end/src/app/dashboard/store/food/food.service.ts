import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FoodService {

  constructor(private httpClient: HttpClient) { }

  createhanien(name:string, price:number,seller:string , component: string) {
    return this.httpClient.post(environment.apiUrl + 'hanien/createhanien', {'name':name, 'price':price,'seller':seller,'component':component});
  }

  gethaniens(){
    return this.httpClient.get(environment.apiUrl + 'hanien/gethaniens');
  }

  updatehanien(pid: object,name:string, price:number,seller:string, component: string ) {
    return this.httpClient.patch(environment.apiUrl + 'hanien/updatehanien/'+pid, {'name':name,'price':price,'seller':seller,'component':component});
  }

deletehanien(pid:object){
  return this.httpClient.delete(environment.apiUrl +'hanien/deletehanien/' +pid );
}
}
