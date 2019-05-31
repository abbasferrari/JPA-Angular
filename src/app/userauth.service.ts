import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../user';
import { RequestURL } from '../RequestURL';

@Injectable({
  providedIn: 'root'
})
export class UserauthService {

private url = new RequestURL();
private loggedInStatus = JSON.parse(localStorage.getItem('logFlag') || 'false')
//private url : string = "http://localhost:8080/userAuth"; //"https://lit-eyrie-15561.herokuapp.com/userAuth";
private auth_url : string = this.url.url_main_string+"/auth_user"; // "https://lit-eyrie-15561.herokuapp.com/auth_user";
private geturl :string =    this.url.url_main_string+"/getUsers";  // "https://lit-eyrie-15561.herokuapp.com/getUsers";
private reg_url : string =  this.url.url_main_string+"/signup_user"; // "https://lit-eyrie-15561.herokuapp.com/signup_user";
//private url_1 : string = "https://obscure-springs-69062.herokuapp.com/userAuth";
//private geturl_1 :string = "https://obscure-springs-69062.herokuapp.com/getUsers";
  constructor(private http: HttpClient) { 
  }

  setLoggedIn(value : boolean,userId : string){
    this.loggedInStatus = value
    localStorage.setItem('logFlag','true')
    localStorage.setItem('userId',userId)
  }  

  get isLoggedIn(){
    return JSON.parse(localStorage.getItem('logFlag') || this.loggedInStatus)
  }

  get loggedInUser(){
    return JSON.parse(localStorage.getItem("userId"));
  }
  setLogout(){
    this.loggedInStatus = false;
    localStorage.removeItem('logFlag');
    localStorage.removeItem('userId');
  }
  public auth_user(u : User){
    return this.http.post(this.auth_url,u,{responseType: 'text'});
  }
  public registerUser(u : User){
    return this.http.post<User>(this.reg_url,u);
  }
  public getUsers():Observable<String>{
    return this.http.get<String>(this.geturl);
  }
}
