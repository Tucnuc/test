import { Component, Inject, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SharedService } from '../shared/shared.service';
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

  constructor(public shared: SharedService, private fb: FormBuilder, private router: Router) { }

  families: Families = { };
  familiesKeys: string[] = [ ];
  
  ngOnInit(): void {
    this.families = this.shared.getFamilies();
    this.familiesKeys = Object.keys(this.families);

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

    if (chosenFamilies.length > 0) {
      localStorage.setItem('chosenFamilies', JSON.stringify(chosenFamilies));
      this.router.navigate(['/test']);
    } else {
      console.error('No families were chosen');
    }
  }
}