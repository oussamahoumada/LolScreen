import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ChampionsService } from '../../../Services/champions.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, public championService:ChampionsService ) {
  }

  ngOnInit() {
  }

  delete(name:string) {
    if (confirm("do you want to delete '" + name + "'")) {
      this.championService.emitDeleteEvent(this.data);
    }
    else {
      console.log("cancel");
    }
  }

}
