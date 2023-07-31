import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  baseUrl='https://localhost:5001/api/';
  validationErrors:string[]=[];
  constructor(private http:HttpClient) { }
  
  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: res=>console.log(res),
      error: err=>console.log(err)
    })
  }
  get400Error(){
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: res=>console.log(res),
      error: err=>console.log(err)
    })
  }
  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }
  get400ValidationError(){
    this.http.post(this.baseUrl+'account/register',{}).subscribe({
      next:res=>console.log(res),
      error:err=>{
        console.log(err)
        this.validationErrors=err
        console.log('validationErrors',this.validationErrors)
        console.log('done')
      }

    })
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    })
  }

}
