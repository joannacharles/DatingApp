import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})




export class AccountService {
  private currentUserSourse=new BehaviorSubject<User | null>(null);
  currentUser$=this.currentUserSourse.asObservable();
  baseUrl='https://localhost:5001/api/'

  constructor(private http: HttpClient ) { }

  login(model:any){// we are taking in a model parameter
    return this.http.post<User>(this.baseUrl+'account/login',model).pipe(//returning same model parameter  
      map((response:User)=>{//TYPESAFETY
        //const user=response
        if(response){
          localStorage.setItem('user',JSON.stringify(response))
          this.currentUserSourse.next(response)
        }
        
      })
    )
  }
  register(model:any){
    return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
      map(res=>{
        if(res){
          localStorage.setItem('user',JSON.stringify(res))
          this.currentUserSourse.next(res);
        }
      })
    )
  }
  setCurrentUser(user: User){
    this.currentUserSourse.next(user)
  }
  logout(){
    localStorage.removeItem('user');
    this.currentUserSourse.next(null)
  }
}
