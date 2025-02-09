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
  private buttonClickSubject = new Subject<void>();
  onButtonClick = this.buttonClickSubject.asObservable();
  constructor() { }

  families: Families = {};
  setFamilies(data: Families) {
    this.families = data;
  }
  getFamilies() {
    return this.families;
  }

  chosenFamilies: string[] = [];
  setChosenFamilies(data: string[]) {
    this.chosenFamilies = data;
  }
  getChosenFamilies() {
    return this.chosenFamilies;
  }
}