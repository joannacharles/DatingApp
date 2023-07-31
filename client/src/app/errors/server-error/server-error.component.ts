import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error:any;
  constructor(private router:Router) { 
    const navigation=this.router.getCurrentNavigation();
    this.error=navigation?.extras?.state?.['error'];
  }// we are going to display nvigation extras, This is a one time thing. ng oninit is too late. so we'll gt it from routerstate

  ngOnInit(): void {
  }

}
