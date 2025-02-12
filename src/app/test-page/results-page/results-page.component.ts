import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { NgStyle, NgClass, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SharedService } from '../../shared/shared.service';

export interface Plant {
  name: string;
  family: string;
  img: string[];
  colors: boolean[];
}

export interface Families {
  [key: string]: Plant[];
}

@Component({
  selector: 'app-results-page',
  imports: [NgStyle],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ transform: 'scaleY(0)', transformOrigin: 'center' })),
      state('expanded', style({ transform: 'scaleY(1)', transformOrigin: 'center' })),
      transition('collapsed <=> expanded', [animate('1000ms ease-in-out')]),
    ]),
    trigger('fading', [
      state('appear', style({ opacity: 1 })),
      state('disappear', style({ opacity: 0 })),
      transition('appear <=> disappear', [animate('500ms ease-in-out')]),
    ]),
    trigger('fill', [
      state('empty', style({ width: 0 })),
      state('filled', style({ width: '100%' })),
      transition('empty => filled', [animate('2s ease-in-out')]),
    ]),
  ],
})
export class ResultsPageComponent implements OnInit {
  constructor(private shared: SharedService, private cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: Object) { }

  families: Families = {};
  chosenFamilies: string[] = [];
  correctPlants: any[] = [];
  incorrectPlants: any[] = [];

  calculatePercentage(part: number, total: number): number {
    if (total === 0) return 0;
    return parseFloat(((part / total) * 100).toFixed(0));
  }

  typeWriter(txt: string, speed: number) {
    let i = 0;
    const type = () => {
      if (i < txt.length) {
        this.headingText += txt.charAt(i);
        i++;
        setTimeout(type.bind(this), speed);
      }
    };
    type();
  }

  percentage = 0;
  percentageText = 0;
  conAnimState = 'collapsed';
  fillAnimState = 'empty';
  markers = [85, 75, 60, 40];

  fadeState1 = 'disappear';
  fadeState2 = 'disappear';
  markerStates = ['disappear','disappear','disappear','disappear','disappear'];
  headingText: string = '';

  familiesTexts: string[] = [];
  familiesFadeStates: string[] = [];
  familiesFillStates: string[] = [];
  familiesTypeVariables: string[] = [];
  familiesPercentages: number[] = [];
  familiesPerTexts: number[] = [];
  

  ngOnInit(): void {
    this.families = this.shared.getFamilies();
    const familiesKeys = Object.keys(this.families);

    if (isPlatformBrowser(this.platformId)) {
      const storedChosenFamilies = localStorage.getItem('chosenFamilies');
      if (storedChosenFamilies) {
        this.chosenFamilies = JSON.parse(storedChosenFamilies);
      } else {
        console.error('No chosen families found in localStorage');
      }
    }

    const results: { [key: string]: any } = this.shared.getResults();
    const resultsKeys = Object.keys(results);
    
    this.correctPlants = results[resultsKeys[0]];
    this.incorrectPlants = results[resultsKeys[1]];
    // this.correctPlants = [
    //   { name: 'Mrkev Obecná', family: 'Miříkovité', img: ['images/rostliny/mirikovite/mrkev-obecna/mrkev1.webp','images/rostliny/mirikovite/mrkev-obecna/mrkev2.webp','images/rostliny/mirikovite/mrkev-obecna/mrkev3.webp'], colors: [false, false, true] },
    //   { name: 'Miřík Celer', family: 'Miříkovité', img: ['images/rostliny/mirikovite/mirik-celer/celer1.webp','images/rostliny/mirikovite/mirik-celer/celer2.webp','images/rostliny/mirikovite/mirik-celer/celer3.webp'], colors: [false, false, false] },
    //   { name: 'Jeřáb', family: 'Růžovité', img: ['images/rostliny/ruzovite/jerab/jerab1.webp','images/rostliny/ruzovite/jerab/jerab2.webp','images/rostliny/ruzovite/jerab/jerab3.webp','images/rostliny/ruzovite/jerab/jerab4.webp'], colors: [true, false, false, false] },
    // ];
    // this.incorrectPlants = [
    //   { name: 'Jabloň', family: 'Růžovité', img: ['images/rostliny/ruzovite/jablon/jablon1.webp','images/rostliny/ruzovite/jablon/jablon2.webp','images/rostliny/ruzovite/jablon/jablon3.webp'], colors: [false, false, true] },
    //   { name: 'Hrušeň', family: 'Růžovité', img: ['images/rostliny/ruzovite/hrusen/hrusen1.webp','images/rostliny/ruzovite/hrusen/hrusen2.webp','images/rostliny/ruzovite/hrusen/hrusen3.webp','images/rostliny/ruzovite/hrusen/hrusen4.webp'], colors: [false, false, true, false] },
    //   { name: 'Petržel Obecná', family: 'Miříkovité', img: ['images/rostliny/mirikovite/petrzel-obecna/petrzel1.webp','images/rostliny/mirikovite/petrzel-obecna/petrzel2.webp','images/rostliny/mirikovite/petrzel-obecna/petrzel3.webp'], colors: [false, false, false] },
    // ];

    if (this.correctPlants || this.incorrectPlants) {
      this.percentage = this.calculatePercentage(this.correctPlants.length, this.correctPlants.length + this.incorrectPlants.length);
      console.log(this.percentage);

      // let i: number = 0;
      this.chosenFamilies.forEach(family => {
        const indexOfFamily = familiesKeys.indexOf(family);
        const numberOfPlants = this.families[familiesKeys[indexOfFamily]].length
        const correctPlants = this.correctPlants.filter(plant => plant.family === family).length;

        const percentage = this.calculatePercentage(correctPlants, numberOfPlants);
        this.familiesPercentages.push(percentage);

        this.familiesFadeStates.push('disappear');
        this.familiesFillStates.push('empty');
        this.familiesPerTexts.push(0);
        this.familiesTexts.push('');
      });
    } else {
      console.log('No results to show');
    }
    

    setTimeout(() => {
      this.conAnimState = 'expanded';
      setTimeout(() => {

        let i = 0;
        const txt = 'Celkové hodnocení';
        const speed = 40;

        const typeWriter = () => {
          if (i < txt.length) {
            this.headingText += txt.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
          }
        };
        typeWriter();

        setTimeout(() => {
          this.fadeState2 = 'appear';
        }, 100);

        setTimeout(() => {
          for (let i = 0; i < this.markerStates.length; i++) {
            setTimeout(() => {
              this.markerStates[i] = 'appear';
            }, 150 * i);
          }
        }, 500);

        setTimeout(() => {
          const max = this.percentage;
          const delay = (2000 / max) * max / 100;
  
          for (let i = 0; i < max; i++) {
            setTimeout(() => {
              this.percentageText++;
            }, delay + (delay * i));
          }
  
          this.fillAnimState = 'filled';
        }, 1750);

      }, 1200);

      setTimeout(() => {

        this.chosenFamilies.forEach((family, index) => {
          setTimeout(() => {
            let y = 0;
            const speed = 40;
    
            const typeWriter = () => {
              if (y < family.length) {
                this.familiesTexts[index] += family.charAt(y);
                y++;
                setTimeout(typeWriter, speed);
              }
            };
            typeWriter();
          }, 150 * index);
        });

        setTimeout(() => {
          for (let i = 0; i < this.chosenFamilies.length; i++) {
            setTimeout(() => {
              this.familiesFadeStates[i] = 'appear';
            }, 150 * i);
          }
        }, 500);

        setTimeout(() => {
          for (let i = 0; i < this.chosenFamilies.length; i++) {
            setTimeout(() => {
              const max = this.familiesPercentages[i];
              const delay = (2000 / max) * max / 100;
      
              for (let y = 0; y < max; y++) {
                setTimeout(() => {
                  this.familiesPerTexts[i]++;
                }, delay + (delay * y));
              }
      
              this.familiesFillStates[i] = 'filled';
            }, 150 * i);
          }
        }, 1500);

        // let i = 0;
        // const txt = 'Podle čeledí';
        // const speed = 40;

        // const typeWriter = (txt: string) => {
        //   if (i < txt.length) {
        //     this.headingText += txt.charAt(i);
        //     i++;
        //     setTimeout(typeWriter, speed);
        //   }
        // };
        // typeWriter(txt);
      }, 4000);
    }, 400);
  }
}
