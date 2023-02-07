import { Component, ViewChild } from '@angular/core';
import { SpreadsheetComponent } from 
'@syncfusion/ej2-angular-spreadsheet';
import {formulaData} from './data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myangularproject';

  @ViewChild("spreadsheet")
  public ssObj: SpreadsheetComponent|undefined;

  public data:object = formulaData;

  public calculatePercentage(cellAddr1:string, cellAddr2:string){
    return (Number(cellAddr1)/Number(cellAddr2))*100;
  }

  public onCreate(){
    this.ssObj?.cellFormat({ fontWeight: 'bold', 
    textAlign: 'center' }, 'A1:G1');
    this.ssObj?.addCustomFunction(this.calculatePercentage, "Percentage"); // Adding custom function
    this.ssObj?.updateCell({value: "Percentage"}, "G1");
    this.ssObj?.updateCell({formula: "=Percentage(F2,B2)"}, "G2");
    this.ssObj?.numberFormat("0.00","F2:G15");
    this.ssObj?.addDefinedName({name:"Profit", refersTo: "F2:F11"})
    this.ssObj?.updateCell({value: "Average"}, "E13");
    this.ssObj?.updateCell({formula:"=Average(Profit)"}, "F13"); //used the named range
  }
}
