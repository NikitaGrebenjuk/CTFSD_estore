import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  output1: string ="";
  output2: string ="";
  output3: string ="";
  listOfDivs: Element[] =[];
  counter:number = 80;
  car: string = "  .-'--`-._<br>  '-O---O--'";
  backgroundFlag = false;
  myInterval:any;
 

  constructor() {

   }

  ngOnInit(): void {

    let matching: NodeListOf<Element>  = document.querySelectorAll('[class*="g_row"]');
    this.output1 = matching.length.toString() ;
    let i =0;
    matching.forEach( (div_row) => {
      div_row.querySelectorAll('[class*="g_cell"]').forEach( (div_cell) => {
        this.listOfDivs.push(div_cell);
        div_cell.innerHTML=i.toString();
        div_cell.id="div_" + i.toString();
        i++;
      }
      );
      }
    );
    this.output3 = this.listOfDivs.length.toString();

  }

  startCars(): void {
    const date = new Date();
    this.output1 = date.toLocaleTimeString();
    if(this.counter>83){
      this.counter= this.counter%84;
    }
    this.listOfDivs[this.counter].innerHTML = this.car;
    this.listOfDivs[((this.counter == 0) ? 83:(this.counter-1) )].innerHTML = "";  
    this.counter++;
  }

  startButton():void {
    this.myInterval = setInterval(()=> {this.startCars();}, 50);

  }
  stopButton():void {
    clearInterval(this.myInterval);
  }
}
