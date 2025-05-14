
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout.component'; 
import { HomeComponent } from './features/home/home.component'; 

export const routes: Routes = [
  {
    path: '', 
    component: MainLayoutComponent, 
    children: [ 
      {
        path: '', 
        component: HomeComponent, 
        title: 'Inicio - FindParty' 
      },
    ]
  },
  {
    path: '', 
    component: MainLayoutComponent, 
    children: [ 
      {
        path: 'hola', 
        component: HomeComponent, 
        title: 'Inicio - FindParty' 
      },
    ]
  },
];