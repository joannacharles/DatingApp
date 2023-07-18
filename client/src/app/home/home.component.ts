import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode=false;
  registerToggle(){
    this.registerMode=!this.registerMode
  }
  constructor() { }

  ngOnInit(): void {
  }
  cancelRegisterMode(stuf:boolean){
    this.registerMode=stuf
  }

}
