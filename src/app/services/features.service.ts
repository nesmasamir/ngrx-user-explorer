import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  constructor() { }
  searchInpText = new BehaviorSubject<string>("");

  setLightThem(val: boolean = true) {
    localStorage.setItem("lightThem", val.toString())
  }

  getLightThem() {
    return localStorage.getItem("lightThem")
  }

}
