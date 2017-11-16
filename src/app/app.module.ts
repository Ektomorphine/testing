import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { NgModel, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestPage } from './pages/test/test.page';
import { SelectTestPage } from './pages/select-test/select-test.page';
import { NavbarComponent } from './components/navbar/navbar.component';

import { TestService } from './services/test.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    TestPage,
    NavbarComponent,
    SelectTestPage
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
    MatToolbarModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
