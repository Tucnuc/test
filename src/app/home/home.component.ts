import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
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
  imports: [MatCheckboxModule, ReactiveFormsModule, MatButtonModule, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
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
    trigger('fading2', [
      state('appear', style({ opacity: 1 })),
      state('disappear', style({ opacity: 0 })),
      transition('appear <=> disappear', [animate('1000ms ease-in-out')]),
    ]),
    trigger('backgroundFading', [
      state('appear', style({ opacity: 1 })),
      state('disappear', style({ opacity: 0 })),
      transition('appear <=> disappear', [animate('2000ms ease-in-out')]),
    ]),
    trigger('zooming', [
      state('unzoom', style({ transform: 'scale(1)' })),
      state('zoom', style({ transform: 'scale(1.1)' })),
      transition('unzoom <=> zoom', [animate('7500ms ease-in-out')]),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  myForm!: FormGroup;

  constructor(public shared: SharedService, private fb: FormBuilder, private router: Router) { }

  families: Families = { };
  familiesKeys: string[] = [ ];
  filteredFamiliesKeys: string[] = [];
  searchQuery: string = '';
  searchControl: FormControl = new FormControl('');
  
  ngOnInit(): void {
    if (this.shared.getStatus()) { setTimeout(() => { this.cycleImages() }, 150) }
    this.families = this.shared.getFamilies();
    this.familiesKeys = Object.keys(this.families);

    for (let i = 0; i < this.familiesKeys.length; i++) { this.checkFadeStates.push('disappear') }

    this.myForm = this.fb.group({
      families: this.fb.array([])
    })
    this.setFamiliesFormControls();
    this.filteredFamiliesKeys = [...this.familiesKeys];
    
    if (typeof window !== 'undefined') {
      window.onload = () => {
        setTimeout(() => {
          this.cycleImages();
        }, 150);
      };
    }
  }

  get familiesForm() {
    return this.myForm.get('families') as FormArray;
  }

  setFamiliesFormControls() {
    const familiesArray = this.myForm.get('families') as FormArray;
    this.familiesKeys.forEach(() => {
      familiesArray.push(new FormControl(false));
    });
  }

  toggleAll(checked: boolean) {
    const familiesArray = this.myForm.get('families') as FormArray;
    familiesArray.controls.forEach((control, index) => {
      if (this.filteredFamiliesKeys.includes(this.familiesKeys[index])) {
        control.setValue(checked);
      }
    });
  }

  isAllSelected(): boolean {
    const familiesArray = this.myForm.get('families') as FormArray;
    const visibleIndices = this.familiesKeys
      .map((key, index) => ({ key, index }))
      .filter(item => this.filteredFamiliesKeys.includes(item.key))
      .map(item => item.index);

    return visibleIndices.every(i => familiesArray.at(i).value);
  }

  isIndeterminate(): boolean {
    const familiesArray = this.myForm.get('families') as FormArray;
    const visibleIndices = this.familiesKeys
      .map((key, index) => ({ key, index }))
      .filter(item => this.filteredFamiliesKeys.includes(item.key))
      .map(item => item.index);

    const anyChecked = visibleIndices.some(i => familiesArray.at(i).value);
    return anyChecked && !this.isAllSelected();
  }

  choosingComplete() {
    console.log(this.myForm.value);
  }

  isExpanded: boolean = false;
  btnFade: string = 'appear';
  visible: boolean = true;
  checkFadeStates: string[] = ['disappear', 'disappear'];

  readyToStart() {
    this.btnFade = 'disappear';
    setTimeout(() => { this.visible = false }, 510);
    setTimeout(() => {
      this.isExpanded = true;
      setTimeout(() => {
        for (let i = 0; i < this.checkFadeStates.length; i++) {
          setTimeout(() => {
            this.checkFadeStates[i] = 'appear';
          }, 150 * i);
        }
      }, 1150);
    }, 650);
  }

  backdropFadeState: string = 'disappear';
  fadeState: string = 'appear';

  choosingCompleted() {
    const formValues = this.myForm.value['families']
    const chosenFamilies: string[] = [];
    formValues.forEach((value: boolean, index: number) => {
      if (value) {
        chosenFamilies.push(this.familiesKeys[index]);
        console.log(`${this.familiesKeys[index]} was chosen`);
      }
    });

    if (chosenFamilies.length > 0) {
      setTimeout(() => {
        this.backdropFadeState = 'appear';
        this.fadeState = 'disappear';

        setTimeout(() => {
          this.isExpanded = false;
          setTimeout(() => {
            localStorage.setItem('chosenFamilies', JSON.stringify(chosenFamilies));
            this.router.navigate(['/test']);
          }, 1250);
        }, 750);
      }, 250);
    } else {
      console.error('No families were chosen');
    }
  }

  backgrounds: string[] = [
    'images/backgrounds/background1.webp',
    'images/backgrounds/background2.webp',
    'images/backgrounds/background3.webp',
    'images/backgrounds/background4.webp',
  ]
  zoomState: boolean = false;
  activeImage = 0;
  fadeStates: boolean[] = [true,false,false,false];

  zoomDuration = 7500;
  fadeDuration = 2200;
  cycleDelay   = 250;

  cycleImages(): void {
    if (this.shouldZoom()) {
      this.zoomState = !this.zoomState;
    }
    
    setTimeout(() => {
      const next = (this.activeImage + 1) % this.backgrounds.length;
      
      this.fadeStates[this.activeImage] = false;
      this.fadeStates[next] = true;
      
      setTimeout(() => {
        this.activeImage = next;
        
        setTimeout(() => {
          this.cycleImages();
        }, this.cycleDelay);
        
      }, this.fadeDuration);
      
    }, this.zoomDuration);
  }

  shouldZoom(): boolean {
    return window.innerWidth > 600;
  }

}