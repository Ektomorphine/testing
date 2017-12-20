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
import { ResultsPage } from './pages/results/results.page';
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
import { TestGuard } from './services/test.guard';
import { CurrentTestGuard } from './services/current-test.guard';
import { HomePage } from './pages/home/home.page';


@NgModule({
  declarations: [
    AppComponent,
    TestPage,
    NavbarComponent,
    SelectTestPage,
    AddTestPage,
    PreviewPage,
    EditTestPage,
    ResultsPage,
    HomePage
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
  providers: [TestService, TestGuard, CurrentTestGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
