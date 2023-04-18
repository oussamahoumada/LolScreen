import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { champions } from 'src/Model/champions';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  public championsV1List!: champions;
  public championsV2List!: champions;

  constructor(private http: HttpClient) {
    this.getChampionsV1().subscribe(res => {
      this.championsV1List = res;
    })

    this.getChampionsV2().subscribe(res => {
      this.championsV2List = res;
    })
  }

  eventEmitter: EventEmitter<string> = new EventEmitter();

  emitDeleteEvent(eventData: any) {
    this.eventEmitter.emit(eventData);
  }

  readonly championsV1URL: string = "assets/champion_info.json";
  readonly championsV2URL: string = "assets/champion_info_2.json";



  public getChampionsV1():Observable<champions> {
    return this.http.get<champions>(this.championsV1URL);
  }

  public getChampionsV2():Observable<champions> {
    return this.http.get<champions>(this.championsV2URL);
  }

  public deleteChampion(champion:any,version:string) {
    if (version === "V1") {
      let data: champions;
      this.getChampionsV1().subscribe(res => {
        data = res;
        this.deleteElement(data, champion.id, this.championsV1URL);
      });
    }
    else {
      let data: champions;
      this.getChampionsV2().subscribe(res => {
        data = res;
        this.deleteElement(data, champion.key, this.championsV2URL);
      });
    }
  }

  deleteElement(champions: champions, ident: any, url: string) {
    let newData = champions.data;
    console.log(Object.entries(newData)[0][1].name)
    Object.entries(newData).forEach((elem) => {

      if (elem[1].id === ident) {
        let e:any = elem[0];
        delete newData[e];
        let result = {
          type : champions.type,
          version : champions.version,
          data : newData
        }

        console.log(result)
        this.http.put("http://localhost:4200/src/assets/demo.json", JSON.stringify(result)).subscribe(response => {
          console.log(response);
        });
      }
    });

  }


}
