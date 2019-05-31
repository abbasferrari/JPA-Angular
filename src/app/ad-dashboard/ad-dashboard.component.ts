import { Component, OnInit } from '@angular/core';
import { Item } from './Item';
import { AdServiceService } from '../ad-service.service';
import { UserauthService } from '../userauth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderItem } from './order';
import { strictEqual } from 'assert';
import { stringify } from 'querystring';
import { Transaction } from '../order-checkout/TransactionObject';
import { Ad } from '../Ad';
import { CompileShallowModuleMetadata } from '@angular/compiler';
@Component({
  selector: 'app-ad-dashboard',
  templateUrl: './ad-dashboard.component.html',
  styleUrls: ['./ad-dashboard.component.css']
})
export class AdDashboardComponent implements OnInit {
  
  public ads : Item[] = [];
  public ad : Item;
  public temp : string = localStorage.getItem("logFlag") ;
  public userId : string = localStorage.getItem('userId');
  private obj  = new OrderItem();
  public ele : any ;
  public t : Item[] = [];
  public checkOutNow : boolean = false;
  public accDetails : boolean[] = [true,true,true,true]; //Login MyOrders MyAds Logout 

  //seller_id 
  public seller_id : string = localStorage.getItem('userId');
  public newAd = new Ad();
  public postedAd : boolean = false;
  public closeNow : boolean = false;
 

  constructor(private adservice : AdServiceService, private router : Router,) {
    //this.showAds();
    console.log = function() {}
    if (this.userId != null) {
      this.accDetails[0] = false;
      this.accDetails[1] = true;
      this.accDetails[2] = true;
      this.accDetails[3] = true;
    }
    else{
      this.accDetails[0] = true;
      this.accDetails[1] = false;
      this.accDetails[2] = false;
      this.accDetails[3] = false;
    }
  }
  ngOnInit() {
    this.showAds();
  }

  onSearchEnter(sItemValue : string){
    //this.sItemValue = "item";
    //console.log(sItemValue);
    if (sItemValue == null || sItemValue.length == 0){
      alert(sItemValue + "No Search Results");
      this.showAds();
      this.router.onSameUrlNavigation;
    } else{

    this.adservice.searchAdItem(sItemValue).subscribe(
      (searched_ads : Item[]) => {
        this.t = searched_ads;
        this.ads = searched_ads;
        //console.log( JSON.stringify(sItemValue));
        //console.log(this.t);
      });
    }
  }

  show(){
    this.adservice.show().subscribe((data : Item) => this.ad = data);
  }
  postAd(){ 
    if (this.seller_id == null){
      window.alert("Please login to post an ad");
      this.ele = document.getElementById('ad-dashboard-div');
      this.ele.parentNode.removeChild(this.ele);
      this.router.navigateByUrl('/login');
    }
    else{
      this.checkedItem = JSON.parse(localStorage.getItem('orderObj'));
      this.closeNow = true;
      
    }
  }
  login(){
    this.ele = document.getElementById('ad-dashboard-div');
    this.ele.parentNode.removeChild(this.ele);
    this.router.navigateByUrl("/login");
  }

  getOut(){
    this.ele = document.getElementById('ad-dashboard-div');
    this.ele.parentNode.removeChild(this.ele);
    
    this.router.navigateByUrl('/logout');
  }

  buyNow(item_id : string,seller_id : string,price : number){
    if (this.userId != null) {console.log("Buying now" + item_id + seller_id + price+"");
      this.obj.price = price;
      this.obj.item_id = item_id;
      localStorage.setItem('sellerId',seller_id);
      localStorage.setItem('orderObj',JSON.stringify(this.obj));
      this.checkOutNow = true;
      this.orderPlaced = false;
    }
    else{ 
    window.alert("Please sign in to buy your item"); 
    this.ele = document.getElementById('ad-dashboard-div');
    this.ele.parentNode.removeChild(this.ele);
    this.router.navigateByUrl('/login');}
  }
  showAds(){
    this.adservice.showAds().subscribe((ad_data : Item[]) => {
      this.ads = ad_data;
      //this.temp = JSON.stringify(this.ads);
      console.log(this.temp);
      console.log(JSON.stringify(this.ads));
    } );
    //this.adservice.show().subscribe((data) => {return this.ad = data});
  }


//Adding the OrderCheckout - TS file here for checking the MODAL
public trans = new Transaction();
public ordTrans = new Transaction();
public soldItem = new Item();
public checkedItem = new OrderItem();
public TransactionId : string;
public orderPlaced : boolean = false ;
public buttonEnableDisable : boolean = true;



upiPayment(){
  this.adservice.c("");
}
goToHome(){
  //this.router.navigateByUrl("/");
}
paymentCoD(){
  this.checkedItem = JSON.parse(localStorage.getItem('orderObj'));
  this.trans.itemId = this.checkedItem.item_id;
  this.soldItem.i_id = this.checkedItem.item_id;
  this.trans.buyerId = localStorage.getItem('sellerId');
  this.trans.timestamp = null;
  this.trans.trans_id = null;
  //console.log("Payment done via COD -> " + JSON.stringify(this.trans));
  this.adservice.checkOutAd(this.trans).subscribe(
      (data) => {
    //  console.log("___________>>>>>>____>>>>>"+data);
      if(data != null){
        console.log(data);
        this.orderPlaced = true;
        
        setTimeout(() => {
        },500);  
        //this.checkOutNow = false;
        this.orderPlaced = true;
        this.buttonEnableDisable = false;
        this.TransactionId = this.trans.trans_id;
        this.showAds();
      }
    else{
      window.alert("Item Not found...Please search again");
      this.router.onSameUrlNavigation;
    }


    }
  );
  
 /* this.adservice.getTransId(this.trans).subscribe(
    (data) => {console.log("from get trans",data)
    this.orderPlaced = true;
    this.buttonEnableDisable = false;
    this.TransactionId = this.trans.trans_id;
    }
  );*/
  console.log("Order Successfully Placed with Transaction id ");
}

//POSTING AD COMPONENT CODE

cancelAdPost(){
  this.closeNow = false;
  //this.router.navigateByUrl('');
}
postAnAd(){
  this.newAd.sellerId = this.seller_id;
  this.newAd.status = '0';
  console.log(JSON.stringify(this.newAd));

  if (this.seller_id == null){
    window.alert("Please login to post an ad");
    this.router.navigateByUrl('/login');
  }
  this.adservice.postAd(this.newAd).subscribe((data) => {
    console.log("Add posted Successfully")
    this.postedAd = true;
    this.showAds();
    setTimeout(() =>
    {
      //this.router.navigate(['/ads']);
    },1000);
    this.closeNow=  false;
    }

    );
  
  //this.router.navigateByUrl('/ads');
}




  
  
  
  

}
