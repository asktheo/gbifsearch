import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  active : boolean

  constructor() { }

  ngOnInit() {
    this.active = false
  }

  open(){
    this.active = true
  }

  close(){
    this.active = false
  }

}
