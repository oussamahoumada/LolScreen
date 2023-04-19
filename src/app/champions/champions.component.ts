import { Component, OnInit} from '@angular/core';
import { ChampionsService } from '../../Services/champions.service';
import { championsDataV1,championsDataV2 } from 'src/Model/championsData';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.css']
})

export class ChampionsComponent implements OnInit{

  public championsListV1: championsDataV1[] = [];
  public championsListV2: championsDataV2[] = [];
  public version: string = "V1";

  constructor(private championsService: ChampionsService) {
    this.championsService.getChampionsV1().subscribe(res => {
      Object.entries(res.data).forEach(elem => {
        this.championsListV1.push(elem[1]);
      });
      this.dataSource = new MatTableDataSource<any>(this.championsListV1);
    });

    this.championsService.getChampionsV2().subscribe(res => {
      Object.entries(res.data).forEach(elem => {
        this.championsListV2.push(elem[1]);
      });
    });
  }

  public dataSource!: MatTableDataSource<any> ;

  ngOnInit() {
    this.championsService.eventEmitter.subscribe(eventData => {
      if (this.version === "V1") {
        this.championsListV1 = this.championsService.DeleteChampion(eventData, this.championsListV1);
        this.dataSource = new MatTableDataSource<any>(this.championsListV1);
      }
      if (this.version === "V2") {
        this.championsListV2 = this.championsService.DeleteChampion(eventData, this.championsListV2);
        this.dataSource = new MatTableDataSource<any>(this.championsListV2);
      }
    });
  }

  switchVersion() {
    if (this.version === "V1") {
      this.dataSource = new MatTableDataSource<any>(this.championsListV1);
    }
    else if(this.version === "V2") {
      this.dataSource = new MatTableDataSource<any>(this.championsListV2);
    }
  }
}
