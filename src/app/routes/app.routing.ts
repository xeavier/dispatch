import { Routes } from '@angular/router';
import { ResultsComponent } from '../results/results.component';
import { AboutComponent } from '../about/about.component';


export const routes: Routes = [
    { path: '', component: ResultsComponent },
    { path: 'about', component: AboutComponent},
    { path: '**', redirectTo: '' }
];
