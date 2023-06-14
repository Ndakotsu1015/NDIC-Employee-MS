import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMenuItemComponent } from './components/app-menu-item/app-menu-item.component';
import { AppTopBarComponent } from './components/app-top-bar/app-top-bar.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { RouterModule } from "@angular/router";
import { AppLayoutComponent } from './app-layout.component';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule, RouterModule,],
  declarations: [
    AppMenuItemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AppLayoutComponent
  ],
  exports: [
    AppMenuItemComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppSidebarComponent,
    AppLayoutComponent
  ],
  providers: []
})
export class AppLayoutModule { }
