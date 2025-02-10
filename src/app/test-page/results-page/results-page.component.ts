import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-results-page',
  imports: [],
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss'
})
export class ResultsPageComponent implements OnInit {
  constructor(private shared: SharedService) { }

  correctPlants: any[] = [];
  incorrectPlants: any[] = [];

  calculatePercentage(part: number, total: number): number {
    if (total === 0) return 0;
    return (part / total) * 100;
  }

  ngOnInit(): void {
    const results: { [key: string]: any } = this.shared.getResults();
    const resultsKeys = Object.keys(results);
    
    this.correctPlants = results[resultsKeys[0]];
    this.incorrectPlants = results[resultsKeys[1]];
  }
}
