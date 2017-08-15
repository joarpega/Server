import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './modules/panel/panel.component';


const ROUTES: Routes = [
    {
        path: 'panel',
        component: PanelComponent,
    }
];

export const ROUTING = RouterModule.forRoot(ROUTES, { useHash: true });
