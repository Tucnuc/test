import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Plant {
  name: string;
  family: string;
  img: string[];
  colors: boolean[];
}

export interface Families {
  [key: string]: Plant[];
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private dataSubject = new Subject<Families>();
  data$ = this.dataSubject.asObservable();

  constructor() { }

  families: Families = {};
  setFamilies(data: Families) {
    this.families = data;
    console.log(data);
  }
  getFamilies() {
    console.log(this.families);
    return this.families;
  }

  chosenFamilies: string[] = [];
  setChosenFamilies(data: string[]) {
    this.chosenFamilies = data;
    console.log(data);
  }
  getChosenFamilies() {
    console.log(this.chosenFamilies);
    return this.chosenFamilies;
  }

  updateData(data: Families) {
    console.log("UPDATE")
    this.dataSubject.next(data);
  }
}