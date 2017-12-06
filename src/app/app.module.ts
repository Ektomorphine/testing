import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule} from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestPage } from './pages/test/test.page';
import { SelectTestPage } from './pages/select-test/select-test.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddTestPage } from './pages/add-test/add-test.page';
import { PreviewPage } from './pages/preview/preview.page';
import { EditTestPage } from './pages/edit-test/edit-test.page';

import { TestService } from './services/test.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule,
  MatExpansionModule
} from '@angular/material';

import { ContextMenuModule } from 'ngx-contextmenu';


@NgModule({
  declarations: [
    AppComponent,
    TestPage,
    NavbarComponent,
    SelectTestPage,
    AddTestPage,
    PreviewPage,
    EditTestPage
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
    MatSnackBarModule,
    MatDialogModule,
    MatExpansionModule,
    ContextMenuModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
