import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ItemsService } from './items.service'
@Component({
  selector: 'app-dashboard-items',
  template: `
            <p style="color:black"> Insert name of mai: </p>
            <input type="text" [(ngModel)]="maiName"><br/>
            <br/>
            <p style="color:black" > Insert price of mai: </p>
            <input type="number" [(ngModel)]="maiPrice"><br/>
            <br/>

            <button (click)="call()"> Add mai </button>
            `
})


export class ItemsComponent {
  hanienName : string = '';
  hanienPrice : number = 0;


  constructor(private itemsService:ItemsService){

  }

  call(){
     this.itemsService.createhanien(this.hanienName, this.hanienPrice).subscribe();
}
}

   //   this.itemsService.getmais().subscribe(){
   //   res => {
   //     console.log(res.data);
   //   }
   // }
