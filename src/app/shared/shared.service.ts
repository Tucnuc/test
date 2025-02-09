import { Injectable } from '@angular/core';

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
  constructor() { }

  families: Families = {
    Miříkovité: [
      { name: 'Mrkev Obecná', family: 'Miříkovité', img: ['images/rostliny/mirikovite/mrkev-obecna/mrkev1.webp','images/rostliny/mirikovite/mrkev-obecna/mrkev2.webp','images/rostliny/mirikovite/mrkev-obecna/mrkev3.webp'], colors: [false, false, true] },
      { name: 'Miřík Celer', family: 'Miříkovité', img: ['images/rostliny/mirikovite/mirik-celer/celer1.webp','images/rostliny/mirikovite/mirik-celer/celer2.webp','images/rostliny/mirikovite/mirik-celer/celer3.webp'], colors: [false, false, false] },
      { name: 'Petržel Obecná', family: 'Miříkovité', img: ['images/rostliny/mirikovite/petrzel-obecna/petrzel1.webp','images/rostliny/mirikovite/petrzel-obecna/petrzel2.webp','images/rostliny/mirikovite/petrzel-obecna/petrzel3.webp'], colors: [false, false, false] },
    ],
    Růžovité: [
      { name: 'Jabloň', family: 'Růžovité', img: ['images/rostliny/ruzovite/jablon/jablon1.webp','images/rostliny/ruzovite/jablon/jablon2.webp','images/rostliny/ruzovite/jablon/jablon3.webp'], colors: [false, false, true] },
      { name: 'Hrušeň', family: 'Růžovité', img: ['images/rostliny/ruzovite/hrusen/hrusen1.webp','images/rostliny/ruzovite/hrusen/hrusen2.webp','images/rostliny/ruzovite/hrusen/hrusen3.webp','images/rostliny/ruzovite/hrusen/hrusen4.webp'], colors: [false, false, true, false] },
      { name: 'Jeřáb', family: 'Růžovité', img: ['images/rostliny/ruzovite/jerab/jerab1.webp','images/rostliny/ruzovite/jerab/jerab2.webp','images/rostliny/ruzovite/jerab/jerab3.webp','images/rostliny/ruzovite/jerab/jerab4.webp'], colors: [true, false, false, false] },
    ],
    // Ruzovite: [],
  };

  getFamilies() {
    return this.families;
  }
}