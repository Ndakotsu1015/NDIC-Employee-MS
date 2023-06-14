import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { UiModule } from '../ui/ui.module';


const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./layout/pages/pages.module').then(m => m.PagesModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
  ],
})
export class AdminModule { }
