import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserauthService } from '../userauth.service';
@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  public u = new User();
  constructor(private s : UserauthService ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.s.auth_user(this.u).subscribe(
      (data)=>{console.log("success ", data);
    console.log(this.u.email+ " --------- "+this.u.password);}
    );
  }

}
