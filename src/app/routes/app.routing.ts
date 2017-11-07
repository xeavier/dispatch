import { Routes } from '@angular/router';
import { ResultsComponent } from '../results/results.component';
import { MainComponent } from '../main/main.component';
import { AboutComponent } from '../about/about.component';


export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'about', component: AboutComponent},
    { path: '**', redirectTo: '' }
];
