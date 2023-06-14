import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MessageService } from "primeng/api";
import { PRIMENG_IMPORTS } from "./prime-ng";

@NgModule({
  imports: [CommonModule, ...PRIMENG_IMPORTS],
  exports: [...PRIMENG_IMPORTS],
  providers: [MessageService],
})
export class UiModule { }
