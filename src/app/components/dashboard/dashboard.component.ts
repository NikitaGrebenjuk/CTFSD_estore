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
  myInterval:any[]= [];
 

  constructor() {

   }

  ngOnInit(): void {

    let matching: NodeListOf<Element>  = document.querySelectorAll('[class*="g_row"]');
    this.output1 = matching.length.toString();
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

  async startCars(line:number,counter:number): Promise<void> {
    counter = counter%12;
    this.listOfDivs[(line*12)+counter].innerHTML = this.car;
    if(!counter){
      this.listOfDivs[(line*12)+11].innerHTML = ""; 
    } else{
      this.listOfDivs[(line*12)+counter-1].innerHTML = ""; 
    }
    counter++;
  }

  startButton():void {
    let counter:number[] ;
    counter= [0,0,0,0,0,0,0];
    for (let c=counter.length; c>0; c--){
      this.myInterval[c-1] = setInterval(()=> {
        this.startCars(c-1,counter[c-1]);
        counter[c-1]++;}, 60 + c*20);
    }
  }
  stopButton():void {
    for (let interval of this.myInterval){
      clearInterval(interval);
    }
  }
}
