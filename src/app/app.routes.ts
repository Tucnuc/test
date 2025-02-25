import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestPageComponent } from './test-page/test-page.component';
import { ResultsPageComponent } from './test-page/results-page/results-page.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'test', component: TestPageComponent },
    { path: 'results', component: ResultsPageComponent },

    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '**', redirectTo: '/home' },
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })
// export class AppRoutingModule { }