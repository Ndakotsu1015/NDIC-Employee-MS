import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { UiModule } from "src/app/main/ui/ui.module";
import { EmployeeNewComponent } from "./employee-new/employee-new.component";


const routes: Routes = [
  {
    path: 'new',
    component: EmployeeNewComponent,
  },

];

@NgModule({
  declarations: [
    EmployeeNewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
  ],
  providers: [],
})
export class EmployeeModule { }
