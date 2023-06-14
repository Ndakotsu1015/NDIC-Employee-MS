import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { UiModule } from '../ui/ui.module';

const errorMessage: string =
  'Verification link expired!';

const successMessage: string =
  'Email successfully verified, please login';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },

];

@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    MessagesModule,
    MessageModule,
  ],
})
export class AuthModule { }
