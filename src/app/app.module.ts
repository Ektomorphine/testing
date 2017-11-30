import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { NgModel, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestPage } from './pages/test/test.page';
import { SelectTestPage } from './pages/select-test/select-test.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddTestPage } from './pages/add-test/add-test.page';

import { TestService } from './services/test.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    TestPage,
    NavbarComponent,
    SelectTestPage,
    AddTestPage
  ],
  imports: [
    BrowserModule,
    MarkdownModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
