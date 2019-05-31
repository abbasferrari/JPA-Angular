
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/user';
import { UserauthService } from '../userauth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  public u_emailid : string;
  public new_user = new User();
  public reg_success : boolean = false;
  public reg_opened : boolean;
  constructor(private route : Router,private userService : UserauthService) { this.reg_opened = true; }

  ngOnInit() {
  }

  registerNow(){
    console.log(this.new_user);
    this.new_user.name = this.new_user.id;
    this.userService.registerUser(this.new_user).subscribe((data) => {console.log(data);
    if(data != null){
    this.reg_success = true;
    setTimeout(() => 
    {
    this.route.navigate(['/login']);
    this.reg_opened = false;
    },
    2000);
    
      //this.route.navigateByUrl('/login');
    }
  }
    );
    
  }

  cancelForm(){
    console.log("looggggg");
    this.route.navigateByUrl('/ads');
  }
}
