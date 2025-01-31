import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { BookService } from '../../core/services/book.service';
import { ReservationService } from '../../core/services/reservation.service';
import { PurchaseService } from '../../core/services/purchase.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, NgChartsModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <mat-grid-list cols="2" rowHeight="350px" gutterSize="16px">
        <mat-grid-tile>
          <mat-card class="w-full h-full">
            <mat-card-header>
              <mat-card-title>Book Reservations</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <canvas baseChart
                [data]="reservationsChartData"
                [options]="chartOptions"
                [type]="'line'">
              </canvas>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>

        <mat-grid-tile>
          <mat-card class="w-full h-full">
            <mat-card-header>
              <mat-card-title>Book Sales</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <canvas baseChart
                [data]="salesChartData"
                [options]="chartOptions"
                [type]="'bar'">
              </canvas>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  reservationsChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Reservations',
      fill: false,
      tension: 0.1,
      borderColor: 'rgba(75,192,192,1)'
    }]
  };

  salesChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Sales',
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(
    private bookService: BookService,
    private reservationService: ReservationService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  private loadChartData(): void {
    // TODO: Implement real-time data loading for charts
  }
}