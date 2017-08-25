import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './modules/panel/panel.component';
import { PersonajeComponent } from './modules/personaje/personaje.component';


const ROUTES: Routes = [
    {
        path: 'panel',
        component: PanelComponent,
    },
    {
        path: 'personaje',
        component: PersonajeComponent,
    }
];

export const ROUTING = RouterModule.forRoot(ROUTES, { useHash: true });
