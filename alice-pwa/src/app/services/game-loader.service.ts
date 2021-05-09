import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GameLoaderService {

  constructor(
    private http: HttpClient,
  ) { }
  
}

export class GameData {

  id: string;
  name: string;
  games: 

}