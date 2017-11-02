import { Routes } from '@angular/router';
import { ResultsComponent } from '../results/results.component';


export const routes: Routes = [
    { path: '', component: ResultsComponent },
    { path: '**', redirectTo: '' }
];
