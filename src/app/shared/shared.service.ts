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
    Bobovité: [
      {
        "name": "Čočka Jedlá",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/cocka-jedla/cocka1.webp", "images/rostliny/bobovite/cocka-jedla/cocka2.webp", "images/rostliny/bobovite/cocka-jedla/cocka3.webp", "images/rostliny/bobovite/cocka-jedla/cocka4.webp"],
        "colors": [false, false, false, false]
      },
      {
        "name": "Fazol Obecný",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/fazol-obecny/fazol1.webp", "images/rostliny/bobovite/fazol-obecny/fazol2.webp", "images/rostliny/bobovite/fazol-obecny/fazol3.webp", "images/rostliny/bobovite/fazol-obecny/fazol4.webp"],
        "colors": [false, false, false, false]
      },
      {
        "name": "Hrách Setý",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/hrach-sety/hrach1.webp", "images/rostliny/bobovite/hrach-sety/hrach2.webp", "images/rostliny/bobovite/hrach-sety/hrach3.webp", "images/rostliny/bobovite/hrach-sety/hrach4.webp"],
        "colors": [false, false, false, false]
      },
      {
        "name": "Sója Luštinatá",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/soja-lustinata/soja1.webp", "images/rostliny/bobovite/soja-lustinata/soja2.webp", "images/rostliny/bobovite/soja-lustinata/soja3.webp", "images/rostliny/bobovite/soja-lustinata/soja4.webp"],
        "colors": [false, false, false, false]
      },
      {
        "name": "Bob Obecný",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/bob-obecny/bob1.webp", "images/rostliny/bobovite/bob-obecny/bob2.webp", "images/rostliny/bobovite/bob-obecny/bob3.webp", "images/rostliny/bobovite/bob-obecny/bob4.webp"],
        "colors": [false, false, false, false]
      },
      {
        "name": "Jetel Luční",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/jetel-lucni/jetel1.webp", "images/rostliny/bobovite/jetel-lucni/jetel2.webp", "images/rostliny/bobovite/jetel-lucni/jetel3.webp"],
        "colors": [false, false, false]
      },
      {
        "name": "Tolice Vojtěška",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/tolice-vojteska/tolice1.webp", "images/rostliny/bobovite/tolice-vojteska/tolice2.webp", "images/rostliny/bobovite/tolice-vojteska/tolice3.webp", "images/rostliny/bobovite/tolice-vojteska/tolice4.webp"],
        "colors": [false, false, true, false]
      },
      {
        "name": "Vikev Setá",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/vikev-seta/vikev1.webp", "images/rostliny/bobovite/vikev-seta/vikev2.webp", "images/rostliny/bobovite/vikev-seta/vikev3.webp", "images/rostliny/bobovite/vikev-seta/vikev4.webp"],
        "colors": [false, false, false, true]
      },
      {
        "name": "Komonice Lékařská",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/komonice-lekarska/komonice1.webp", "images/rostliny/bobovite/komonice-lekarska/komonice2.webp", "images/rostliny/bobovite/komonice-lekarska/komonice3.webp", "images/rostliny/bobovite/komonice-lekarska/komonice4.webp"],
        "colors": [false, false, false, false]
      },
      {
        "name": "Lupina Mnoholistá",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/lupina-mnoholista/lupina1.webp", "images/rostliny/bobovite/lupina-mnoholista/lupina2.webp", "images/rostliny/bobovite/lupina-mnoholista/lupina3.webp", "images/rostliny/bobovite/lupina-mnoholista/lupina4.webp"],
        "colors": [false, false, false, true]
      },
      {
        "name": "Janovec Metlatý",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/janovec-metlaty/janovec1.webp", "images/rostliny/bobovite/janovec-metlaty/janovec2.webp", "images/rostliny/bobovite/janovec-metlaty/janovec3.webp", "images/rostliny/bobovite/janovec-metlaty/janovec4.webp", "images/rostliny/bobovite/janovec-metlaty/janovec5.webp"],
        "colors": [false, false, false, false, false]
      },
      {
        "name": "Trnovník Akát",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/trnovnik-akat/trnovnik1.webp", "images/rostliny/bobovite/trnovnik-akat/trnovnik2.webp", "images/rostliny/bobovite/trnovnik-akat/trnovnik3.webp", "images/rostliny/bobovite/trnovnik-akat/trnovnik4.webp", "images/rostliny/bobovite/trnovnik-akat/trnovnik5.webp"],
        "colors": [false, true, false, false, false]
      },
      {
        "name": "Hrachor Jarní",
        "family": "Bobovité",
        "img": ["images/rostliny/bobovite/hrachor-jarni/hrachor1.webp", "images/rostliny/bobovite/hrachor-jarni/hrachor2.webp", "images/rostliny/bobovite/hrachor-jarni/hrachor3.webp", "images/rostliny/bobovite/hrachor-jarni/hrachor4.webp"],
        "colors": [false, false, true, false]
      }
    ],
  };

  getFamilies() {
    return this.families;
  }

  results: any[] = []
  setResults(data: any[]) { this.results = data }
  getResults() { return this.results }

  wasLoaded: boolean = false;
  changeStatus() { this.wasLoaded = true }
  getStatus() { return this.wasLoaded }
}