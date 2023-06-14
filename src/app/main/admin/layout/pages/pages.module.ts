import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { UiModule } from "src/app/main/ui/ui.module";
import { AppLayoutModule } from "../app-layout.module";
import { AppLayoutComponent } from "../app-layout.component";
import { EmployeeNewComponent } from "./employee/employee-new/employee-new.component";



const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      },

    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BreadcrumbModule,
    AppLayoutModule,
    // DashboardModule,

  ],
  declarations: [
  ]
})

export class PagesModule { }
