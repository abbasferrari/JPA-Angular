import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../ad-dashboard/Item';
import { AdServiceService } from '../ad-service.service';
import { Ad } from '../Ad';
@Component({
  selector: 'app-post-ad',
  templateUrl: './post-ad.component.html',
  styleUrls: ['./post-ad.component.css']
})
export class PostAdComponent implements OnInit {
  public seller_id : String = localStorage.getItem('userId');
  public ad = new Ad();
  public postedAd : boolean = false;
  constructor(private router : Router, private adService : AdServiceService) { 
    
  }

  ngOnInit() {
    this.ad.sellerId = this.seller_id;
    this.ad.status = '0';
  }
  cancelAdPost(){
    this.router.navigateByUrl('/ads');
  }
  postAnAd(){
    console.log(JSON.stringify(this.ad));
  
    if (this.seller_id == null){
      window.alert("Please login to post an ad");
      this.router.navigateByUrl('/login');
      
    }
    this.adService.postAd(this.ad).subscribe((data) => {
      console.log("Add posted Successfully")
      this.postedAd = true;
      setTimeout(() => 
      {
        this.router.navigate(['/ads']);
      },5000);  
      }

      );

    //this.router.navigateByUrl('/ads');
  }
}
