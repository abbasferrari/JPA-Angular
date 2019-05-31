import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserauthService } from '../userauth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public u = new User();
  public loginFlag : boolean = false;
  constructor(private s : UserauthService, private router: Router) { 

  }

  ngOnInit() {
  }
  
  onTesting(){

   // this.s.authUser(this.userObj).subscribe((data)=>{console.log("Success",data)});//,error=>console.log("Error",error));
   // this.s.getUsers().subscribe((data)=>{console.log("got it man get it",data)});
   // console.log(this.userObj.password+ "------ "+this.userObj.email + "  ----");

  }
  onRegister(){
    this.router.navigateByUrl("/register");
  }
  onSubmit(){
    if (this.u.email != null && this.u.password != null){
    this.s.auth_user(this.u).subscribe(
      
      (data)=>{console.log("success", data);
      if (data != null) {
        this.loginFlag = true;
        this.router.navigateByUrl("/ads");
        this.s.setLoggedIn(true,data);
      }
      else{
        this.loginFlag = true;
        window.alert(data);
      }});
    }
    else{
      window.alert("Please enter valid details");
    }
    console.log(this.u.email+ " --------- "+this.u.password + localStorage.getItem("logFlag"));}
}