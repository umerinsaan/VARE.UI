import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ScanListComponent } from './main/scan-list/scan-list.component';
import { ScanResultsComponent } from './scan-results/scan-results.component';

export const routes: Routes = [
    {
        path: '',
        component: ScanListComponent
    },
    {
        path: 'scan/:scanId/:ip',
        component: ScanResultsComponent
    }
];
