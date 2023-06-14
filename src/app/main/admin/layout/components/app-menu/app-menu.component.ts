/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { AppLayoutService } from '../../services/app-layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: AppLayoutService) { }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/admin/dashboard'],
          },
        ],
      },
      {
        label: 'Employee',
        items: [
          {
            label: 'Manage Employee',
            items: [
              {
                label: 'New Employee',
                icon: 'pi pi-fw pi-check-square',
                routerLink: ['./admin/pages/employee/new'],
              },
            ],
          },
        ],
      },
      {
        label: 'General Settings',
        items: [
          {
            label: 'Payment Options',
            icon: 'pi pi-fw pi-check-square',
            routerLink: ['/admin/payment-settings'],
          },
        ],
      },
      {
        label: 'Manage Users',
        items: [
          {
            label: 'User List',
            items: [
              {
                label: 'List',
                icon: 'pi pi-fw pi-check-square',
                routerLink: ['/admin/user/list'],
              },
              {
                label: 'New',
                icon: 'pi pi-fw pi-user-plus',
                routerLink: ['/admin/user/new'],
              },
            ],
          },
        ],
      },
    ];
  }
}
