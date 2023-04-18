import { Component,Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { championsDataV1 } from 'src/Model/championsData';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-champions-list',
  templateUrl: './champions-list.component.html',
  styleUrls: ['./champions-list.component.css']
})
export class ChampionsListComponent implements OnInit, OnChanges{

  constructor(private dialog:MatDialog) {

  }
  ngOnInit() {
    //this.dataSource.sort = this.sort;
  }

  @Input() dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns: string[] = ["id", "name", "title", "key"];
  public count!: number;

  logData(row: any) {
    this.dialog.open(DetailsComponent, {data: row});
  }

  applayFilter(filterValue: any) {
    let value:string = (<HTMLInputElement>filterValue).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource']&& changes['dataSource'].currentValue) {
      this.dataSource = changes['dataSource'].currentValue;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.count = this.dataSource.data.length;
    }
  }
}
