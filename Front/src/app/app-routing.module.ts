import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './modules/panel/panel.component';
import { PersonajeComponent } from './modules/personaje/personaje.component';
import { PersonajesComponent } from './modules/personajes/personajes.component';
import { ResidentesComponent } from './modules/residentes/residentes.component';



const ROUTES: Routes = [
    {
        path: 'panel',
        component: PanelComponent,
    },
    {
        path: 'personaje',
        component: PersonajeComponent,
    },
    {
        path: 'personajes',
        component: PersonajesComponent,
    },
    {
        path: 'residentes',
        component: ResidentesComponent,
    }
];

export const ROUTING = RouterModule.forRoot(ROUTES, { useHash: true });
