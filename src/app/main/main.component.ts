import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu'
import { ScanListComponent } from './scan-list/scan-list.component';

@Component({
  selector: 'app-main',
  imports: [MenuModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
