import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{// inject http dependency here 
  title = 'Dating App';
  users:any;
  constructor(private http: HttpClient, private accountService: AccountService){// component goes thru many stages. Constructor is too early for API, sp we can do API fetching in NGOninit
   // this.
  }
  ngOnInit(): void {
    this.getUsers()
    this.setCurrentUser()
  }
  getUsers(){
    this.http.get('https://localhost:5001/api/users/').subscribe(
      {
        next:(response)=>{
          this.users=response
        //console.log(this.users)
        },
        error:err=>console.log(err),
        complete:()=>{console.log("completed")}
      }
    )
  }
  setCurrentUser(){//CODE
    const userString=localStorage.getItem('user')
    if(userString){
      const user:User=JSON.parse(userString)
      this.accountService.setCurrentUser(user)
    }
  }
  
}
