import { Component, OnInit } from '@angular/core';
import { UserauthService } from '../userauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private user : UserauthService, private router : Router ) { }

  ngOnInit() {
      this.user.setLogout();
      this.router.navigateByUrl("/ads");
  }
  
}
