import { CreateVstComponent } from './components/pages/create-vst/create-vst.component';
import { Routes } from '@angular/router';
import { CurrentVstComponent } from '@pages/current-vst/current-vst.component';
import { HomeComponent } from '@pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'current-vst', component: CurrentVstComponent },
  { path: 'create-vst', component: CreateVstComponent },
];
