import { Component, OnInit } from '@angular/core';
import { Scan, ScanService } from '../../services/scan.service';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-scan-list',
  imports: [DialogModule, TableModule, FormsModule, CommonModule, ButtonModule, SkeletonModule, InputTextModule, RouterModule],
  templateUrl: './scan-list.component.html',
  styleUrl: './scan-list.component.css'
})
export class ScanListComponent implements OnInit {
  constructor(private scanService: ScanService) { }

  Scans: any[] = [];
  loading: boolean = true;
  displayDialog: boolean = false;
  newScanIp: string = '';
  loadingArray: any[] = []; // Placeholder array to show skeletons

  ngOnInit(): void {
    this.loadScans();
  }

  openNewScanDialog() {
    this.displayDialog = true;
  }

  createScan() {
    if (this.newScanIp) {
      this.displayDialog = false;
      this.scanService.performScan(this.newScanIp).subscribe((response) => {
        this.loadScans();
      });
      this.loading = true;
      this.newScanIp = ''; // Reset the IP input
    }
  }

  loadScans(): void {
    this.loading = true;
    this.scanService.getAllScans().subscribe({
      next: (res) => {
        this.Scans = res;
        this.loading = false;
        this.loadingArray = [];
      },
      error: (err) => {
        console.error(err);
      }
    })
    this.loadingArray = new Array(this.Scans.length);
  }

  closeDialog() {
    this.displayDialog = false; // Close the dialog
    this.newScanIp = ''; // Clear the IP field
  }
}
