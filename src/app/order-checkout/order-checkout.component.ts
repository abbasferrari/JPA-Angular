import { Component, OnInit } from '@angular/core';
import { Transaction } from './TransactionObject';
import { OrderItem } from '../ad-dashboard/order';
import { AdServiceService } from '../ad-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../ad-dashboard/Item';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.css']
})
export class OrderCheckoutComponent implements OnInit {
  public trans = new Transaction();
  public ordTrans = new Transaction();
  public soldItem = new Item();
  public checkedItem = new OrderItem();
  public TransactionId : string;
  public orderPlaced : boolean = false ;
  public buttonEnableDisable : boolean = true;
  constructor(private route : Router, private adService : AdServiceService) { 
    this.checkedItem = JSON.parse(localStorage.getItem('orderObj'));
    this.trans.itemId = this.checkedItem.item_id;
    this.soldItem.i_id = this.checkedItem.item_id;
    this.trans.buyerId = localStorage.getItem('sellerId');
    //console.log("TRANS OBJ -> "+JSON.stringify(this.trans));
  }

  ngOnInit() {
   
   
  }
  upiPayment(){
    this.adService.c("");
  }
  goToHome(){
    this.route.navigateByUrl("/");
  }
  paymentCoD(){
    console.log("Payment done via COD" + JSON.stringify(this.soldItem));
    this.adService.checkOutAd(this.trans).subscribe(
        (data) => {
        console.log(data);
        this.orderPlaced = true;
        setTimeout(() => {
        },1000);  
        this.route.navigateByUrl("/");
      }
    );
    
    this.adService.getTransId(this.trans).subscribe(
      (data) => {console.log("from get trans",data)
      this.orderPlaced = true;
      this.buttonEnableDisable = false;
      this.TransactionId = this.trans.trans_id;
      }
    );
    
   

    console.log("Order Successfully Placed with Transaction id ");
  }
}
