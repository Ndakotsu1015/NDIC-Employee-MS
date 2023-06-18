import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { EmployeeEndpoint } from 'src/app/api/endpoints/emplyee.endpoint';
import { EmployeeResource } from 'src/app/api/models/employee.model';
import { AppLoadingService } from '../../../services/app-loading.service';
import { AppNotificationService } from '../../../services/app-notification.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeResource[] = [];
  loading = false;
  @ViewChild('filter') filter!: ElementRef;
  updateMode = false

  constructor(private readonly fb: FormBuilder,
    private readonly router: Router,
    private employeeEndpoint: EmployeeEndpoint,
    private readonly appNotificationService: AppNotificationService,
    private readonly appLoadingService: AppLoadingService,) { }

  ngOnInit(): void {
    this.appLoadingService.startLoading('Loading Data...');
    this.employeeEndpoint.list()
      .subscribe({
        next: (response) => {
          this.employees = response.data;
          console.log('My record', response.data)
          this.appLoadingService.stopLoading();
        },
        error: (err) => {
          this.appNotificationService.showError({ title: err });
          this.appLoadingService.stopLoading();
        }
      });
  }
  showDetails(id: number) {
    this.router.navigate(['/admin/pages/employee/detail', id]);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  gotoNewPage() {
    return this.router.navigate(['/admin/pages/employee/new',]);
  }
}





