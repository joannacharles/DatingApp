// JOAN NOtes- intercepts reqs either while sending or recieving
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private toastr:ToastrService) {}//incase we wanna route it to error pg

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        if(error){
          switch(error.status){
            case 400:
              if(error.error.errors){
                const modalStateErrors=[];
                for(const key in error.error.errors){
                  if(error.error.errors[key]){
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              }
              else{
                this.toastr.error(error.error,error.status.toString());
              }
              break;
            case 401:
              this.toastr.error('Unauthorized bsh',error.status.toString());
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras={state:{error:error.error}}
              this.router.navigateByUrl('/server-error',navigationExtras);
              //this.toastr.error('unexpected :o');
              break;
            default:
              this.toastr.error('unexpected :o');
              console.log(error.error);
              break;
          }
        }
        throw Error;
      }
      )
    );
  }
}
