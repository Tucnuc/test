import { Component, Inject, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedService } from '../shared/shared.service';

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
  selector: 'app-home',
  imports: [MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ transform: 'scaleY(0)', transformOrigin: 'center' })),
      state('expanded', style({ transform: 'scaleY(1)', transformOrigin: 'center' })),
      transition('collapsed <=> expanded', [animate('750ms ease-in-out')]),
    ]),
    trigger('fading', [
      state('appear', style({ opacity: 1 })),
      state('disappear', style({ opacity: 0 })),
      transition('appear <=> disappear', [animate('500ms ease-in-out')]),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  myForm!: FormGroup;

  constructor(public shared: SharedService, private fb: FormBuilder) { }

  families: Families = {
    Miříkovité: [
      { name: 'Mrkev Obecná', family: 'Miříkovité', img: ['/images/rostliny/mirikovite/mrkev-obecna/mrkev1.webp','/images/rostliny/mirikovite/mrkev-obecna/mrkev2.webp','/images/rostliny/mirikovite/mrkev-obecna/mrkev3.webp'], colors: [false, false, true] },
      { name: 'Miřík Celer', family: 'Miříkovité', img: ['/images/rostliny/mirikovite/mirik-celer/celer1.webp','/images/rostliny/mirikovite/mirik-celer/celer2.webp','/images/rostliny/mirikovite/mirik-celer/celer3.webp'], colors: [false, false, false] },
      { name: 'Petržel Obecná', family: 'Miříkovité', img: ['/images/rostliny/mirikovite/petrzel-obecna/petrzel1.webp','/images/rostliny/mirikovite/petrzel-obecna/petrzel2.webp','/images/rostliny/mirikovite/petrzel-obecna/petrzel3.webp'], colors: [false, false, false] },
    ],
    Růžovité: [
      { name: 'Jabloň', family: 'Růžovité', img: ['/images/rostliny/ruzovite/jablon/jablon1.webp','/images/rostliny/ruzovite/jablon/jablon2.webp','/images/rostliny/ruzovite/jablon/jablon3.webp'], colors: [false, false, true] },
      { name: 'Hrušeň', family: 'Růžovité', img: ['/images/rostliny/ruzovite/hrusen/hrusen1.webp','/images/rostliny/ruzovite/hrusen/hrusen2.webp','/images/rostliny/ruzovite/hrusen/hrusen3.webp','/images/rostliny/ruzovite/hrusen/hrusen4.webp'], colors: [false, false, true, false] },
      { name: 'Jeřáb', family: 'Růžovité', img: ['/images/rostliny/ruzovite/jerab/jerab1.webp','/images/rostliny/ruzovite/jerab/jerab2.webp','/images/rostliny/ruzovite/jerab/jerab3.webp','/images/rostliny/ruzovite/jerab/jerab4.webp'], colors: [true, false, false, false] },
    ],
    // Ruzovite: [],
  };
  familiesKeys = Object.keys(this.families);
  
  ngOnInit(): void {
    this.shared.setFamilies(this.families);

    this.myForm = this.fb.group({
      families: this.fb.array([])
    })
    this.setFamiliesFormControls();
  }

  get familiesForm() {
    return this.myForm.get('families') as FormArray;
  }

  setFamiliesFormControls() {
    const familiesArray = this.familiesForm;
    this.familiesKeys.forEach(() => {
      familiesArray.push(this.fb.control(false));
    });
  }

  isExpanded = false;
  toggleExpandCollapse() {
    this.isExpanded = !this.isExpanded;
  }

  choosingComplete() {
    const formValues = this.myForm.value['families']
    const chosenFamilies: string[] = [];
    formValues.forEach((value: boolean, index: number) => {
      if (value) {
        chosenFamilies.push(this.familiesKeys[index]);
        console.log(`${this.familiesKeys[index]} was chosen`);
      }
    });

    this.shared.setFamilies(this.families);
    this.shared.setChosenFamilies(chosenFamilies);
    if (chosenFamilies.length > 0) {
      window.location.href = '/test';
    } else {
      console.error('No families were chosen');
    }
  }
}