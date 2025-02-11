import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SharedService } from '../../shared/shared.service';

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
  constructor(private shared: SharedService) { }

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
  markers = [85, 75, 65, 50, 35];

  fadeState1 = 'disappear';
  fadeState2 = 'disappear';
  markerStates = ['disappear','disappear','disappear','disappear','disappear'];
  headingText: string = '';

  ngOnInit(): void {
    const results: { [key: string]: any } = this.shared.getResults();
    const resultsKeys = Object.keys(results);
    
    this.correctPlants = results[resultsKeys[0]];
    this.incorrectPlants = results[resultsKeys[1]];
    // this.correctPlants = [0,1,2,3,5];
    // this.incorrectPlants = [];

    if (this.correctPlants || this.incorrectPlants) {
      this.percentage = this.calculatePercentage(this.correctPlants.length, this.correctPlants.length + this.incorrectPlants.length);
      console.log(this.percentage);
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

    }, 400);
  }
}
