import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { champions } from 'src/Model/champions';
import { championsDataV1,championsDataV2 } from 'src/Model/championsData';


@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  constructor(private http: HttpClient) {
  }

  eventEmitter: EventEmitter<string> = new EventEmitter();
  readonly championsV1URL: string = "assets/champion_info.json";
  readonly championsV2URL: string = "assets/champion_info_2.json";

  emitDeleteEvent(eventData: any) {
    this.eventEmitter.emit(eventData);
  }

  public getChampionsV1():Observable<champions> {
    return this.http.get<champions>(this.championsV1URL);
  }

  public getChampionsV2():Observable<champions> {
    return this.http.get<champions>(this.championsV2URL);
  }

  public DeleteChampion(champion: any, data: any[]) {
      Object.entries(data).forEach((elem,index) => {
        if (elem[1].id === champion.id) {
          data.splice(index, 1);
        }
      });
    return data;
  }
}
