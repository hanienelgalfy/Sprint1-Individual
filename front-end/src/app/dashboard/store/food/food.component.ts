import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FoodService } from './food.service'
@Component({
  selector: 'app-food',
  template: '<ng2-smart-table [settings]="settings" [source]="data" (createConfirm)="onCreateCall($event)" (editConfirm)="onEditCall($event)" (deleteConfirm)= onDeleteCall($event) ></ng2-smart-table>',
  providers: [FoodService]
})

export class FoodComponent implements OnInit {
  settings = {

    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    delete:{
      confirmDelete:true,
    },
    columns: {

      name: {
        title: 'Product Name'
      },
      price: {
        title: 'Price'
      },
      createdAt: {
        title: 'Created At'
      },
      updatedAt: {
        title: 'Updated At'
      },
       component: {
        title: 'Component Name'
      },
      seller: {
        title: 'Seller Name'
      },
     
    }
  };

  data = [];
  constructor(private foodService:FoodService){

  }
  onCreateCall(event){
       event.confirm.resolve(event.newData);
       this.foodService.createhanien(event.newData.name, event.newData.price,event.newData.seller,event.newData.component).subscribe();
  }
  onEditCall(event){
       event.confirm.resolve(event.newData);
       this.foodService.updatehanien(event.newData._id ,event.newData.name, event.newData.price,event.newData.seller,event.newData.component).subscribe();
  }
  onDeleteCall(event){
    event.confirm.resolve(event.data);
    this.foodService.deletehanien(event.data._id).subscribe();
  }
  ngOnInit() {
    this.foodService.gethaniens().subscribe(
      (res: any) => {
        console.log(res)
        if(res.hasOwnProperty('data'))
        this.data = res.data;
      }
    );
   }


}
