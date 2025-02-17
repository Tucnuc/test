import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { NgStyle, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SharedService } from '../../shared/shared.service';
import { Router } from '@angular/router';

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
  constructor(private shared: SharedService, @Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

  families: Families = {};
  chosenFamilies: string[] = [];
  correctPlants: Plant[] = [];
  incorrectPlants: Plant[] = [];
  incorrectFamilies: string[] = [];

  supportHomeBtn() {
    this.router.navigate(['/home']);
  }

  calculatePercentage(part: number, total: number): number {
    if (total === 0) return 0;
    return parseFloat(((part / total) * 100).toFixed(0));
  }

  typeWriter(txt: string) {
    let i = 0;
    const speed = 40;
    const typeWriter = () => {
      if (i < txt.length) {
        this.headingText += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    };
    typeWriter();
  }

  getFilteredPlants(family: string): Plant[] {
    return this.incorrectPlants.filter(plant => plant.family === family);
  }

  percentage: number = 0;
  percentageText: number = 0;
  conAnimState: string = 'collapsed';
  con3AnimState: string = 'collapsed';
  fillAnimState: string = 'empty';
  markers: number[] = [85, 75, 60, 40];

  fadeState1: string = 'disappear';
  fadeState2: string = 'disappear';
  fadeState3: string = 'appear';
  markerStates: string[] = ['disappear','disappear','disappear','disappear','disappear'];
  headingText: string = '';

  familiesTexts: string[] = [];
  familiesFadeStates: string[] = [];
  familiesFillStates: string[] = [];
  familiesTypeVariables: string[] = [];
  familiesPercentages: number[] = [];
  familiesPerTexts: number[] = [];
  familiesTextsFadeStates: string[] = [];

  switchBtnState: string = 'disappear';
  isFinished: boolean = false;
  hidden: boolean = true;
  incorrectFamiliesTexts: string[] = [];
  incorrectPlantsFadeStates: string[] = [];

  nextResults() {
    this.switchBtnState = 'disappear';
    setTimeout(() => {
      this.fadeState3 = 'disappear';
    }, 150);
    setTimeout(() => {
      this.isFinished = false;
    }, 525);

    setTimeout(() => {
      this.conAnimState = 'collapsed';
      setTimeout(() => {
        this.hidden = false;
        this.headingText = '';
        this.conAnimState = 'expanded';

        setTimeout(() => {
          this.typeWriter('Nevěděli jste:');
          this.fadeState3 = 'appear';

          setTimeout(() => {
            this.incorrectFamilies.forEach((family, index) => {
              setTimeout(() => {
                let i = 0;
                const speed = 40;
                const typeWriter = () => {
                  if (i < family.length) {
                    this.incorrectFamiliesTexts[index] += family.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                  }
                };
              typeWriter();
              }, 150 * index);
            });
            
            setTimeout(() => {
              for (let i = 0; i < this.incorrectPlantsFadeStates.length; i++) {
                setTimeout(() => {
                  this.incorrectPlantsFadeStates[i] = 'appear';
                }, 150 * i);
              }
            }, 200);
          }, 800);

        }, 1500);


      }, 1200);
    }, 750);
  }


  
  ngOnInit(): void {
    this.shared.changeStatus();
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

    if (this.correctPlants || this.incorrectPlants) {
      this.percentage = this.calculatePercentage(this.correctPlants.length, this.correctPlants.length + this.incorrectPlants.length);
      console.log(this.percentage);

      this.chosenFamilies.forEach(family => {
        this.incorrectPlants.forEach(plant => {
          if (plant.family === family && !this.incorrectFamilies.includes(plant.family)) {
            this.incorrectFamilies.push(plant.family);
            this.incorrectFamiliesTexts.push('');
          }
        });
      });

      for (let i = 0; i < this.incorrectPlants.length; i++) {
        this.incorrectPlantsFadeStates.push('disappear');
      }

      this.chosenFamilies.forEach(family => {
        const indexOfFamily = familiesKeys.indexOf(family);
        const numberOfPlants = this.families[familiesKeys[indexOfFamily]].length
        const correctPlants = this.correctPlants.filter(plant => plant.family === family).length;

        const percentage = this.calculatePercentage(correctPlants, numberOfPlants);
        this.familiesPercentages.push(percentage);

        this.familiesFadeStates.push('disappear');
        this.familiesTextsFadeStates.push('appear');
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

        this.typeWriter('Celkové hodnocení')

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

          setTimeout(() => {
            if (this.percentage < 100) {
              this.isFinished = true;
              this.switchBtnState = 'appear';
            }
          }, 600 * Math.sqrt(this.chosenFamilies.length));
        }, 1500);
      }, 4000);
    }, 400);
  }
}
