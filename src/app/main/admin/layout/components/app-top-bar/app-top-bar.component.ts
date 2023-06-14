import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppLayoutService } from '../../services/app-layout.service';
// import { AuthService } from 'src/app/main/auth/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.scss'],
})
export class AppTopBarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: AppLayoutService,
    // private authService: AuthService,
    private _router: Router
  ) { }

  logOut() {
    console.log('log out');
    // this.authService.logout();
    this._router.navigate(['/auth/login']);
  }

  profile() {
    this._router.navigate(['/admin/account/profile']);
  }
}
