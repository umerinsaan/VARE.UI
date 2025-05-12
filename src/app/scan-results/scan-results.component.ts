import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';

import { PanelMenuModule } from 'primeng/panelmenu';
import { ScanService } from '../services/scan.service';

@Component({
  selector: 'app-scan-results',
  imports: [CommonModule, PanelMenuModule, CardModule],
  templateUrl: './scan-results.component.html',
  styleUrl: './scan-results.component.css'
})
export class ScanResultsComponent implements OnInit {
  constructor(private activatedRouote: ActivatedRoute, private scanService: ScanService) {

  }
  ip: string = '';
  scanId: number = 0;

  executions: any[] = [];
  selectedExecution: any = null;

  toolMenu: any[] = [];

  ngOnInit(): void {
    this.scanId = parseInt(this.activatedRouote.snapshot.paramMap.get('scanId')!);
    this.ip = this.activatedRouote.snapshot.paramMap.get('ip')!;
    console.log("ip:", this.ip)
    console.log("scanid:", this.scanId);
    this.loadExecutions();
  }

  loadExecutions() {
    this.scanService.getToolExecutionsByScanId(this.scanId).subscribe((res: any[]) => {
      this.executions = res;

      this.toolMenu = this.executions.map(exec => ({
        label: exec.tool,
        command: () => {
          this.selectedExecution = exec;
        }
      }));
    });
  }
}
