import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { EmployeeNewComponent } from "./employee-new/employee-new.component";
import { FileUploadModule } from 'primeng/fileupload';
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { ConfirmationService } from "primeng/api";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";
import { UiModule } from "src/app/main/ui/ui.module";


const routes: Routes = [
  {
    path: 'new',
    component: EmployeeNewComponent,
  },
  {
    path: 'list',
    component: EmployeeListComponent,
  },
  {
    path: 'detail/:id',
    component: EmployeeDetailComponent,
  },

];

@NgModule({
  declarations: [
    EmployeeNewComponent,
    EmployeeListComponent,
    EmployeeDetailComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FileUploadModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,


  ],
  providers: [ConfirmationService],
})
export class EmployeeModule { }
