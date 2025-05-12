import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Scan {
  id: number;
  ip: string;
  createdAt: string;
  toolExecutions?: {
    id: number;
    tool: string;
    command: string;
    output: string;
    executedAt: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private apiUrl = 'http://localhost:3000/scan';

  constructor(private http: HttpClient) { }

  getAllScans(): Observable<Scan[]> {
    return this.http.get<Scan[]>(this.apiUrl);
  }

  performScan(ipAddress: string): Observable<any> {
    return this.http.post(this.apiUrl, { ip: ipAddress });
  }

  getToolExecutionsByScanId(scanId: number): Observable<any> {
    let params = new HttpParams();
    if (scanId) params = params.set("scanId", scanId.toString());
    return this.http.get(this.apiUrl + '/by-scan', { params });
  }
}
