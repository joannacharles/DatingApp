import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{// inject http dependency here 
  title = 'Dating App';
  users:any;
  constructor(private http: HttpClient){// component goes thru many stages. Constructor is too early for API, sp we can do API fetching in NGOninit
   // this.
  }
  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/users').subscribe(
      {
        next:(response)=>{this.users=response},
        error:err=>console.log(err),
        complete:()=>{console.log("completed")}
      }
    )
  }
  
}
