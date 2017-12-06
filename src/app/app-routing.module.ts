import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TestPage } from './pages/test/test.page';
import { SelectTestPage } from './pages/select-test/select-test.page';
import { AddTestPage } from './pages/add-test/add-test.page';
import { PreviewPage } from './pages/preview/preview.page';
import { EditTestPage } from './pages/edit-test/edit-test.page';


const routes: Routes = [
  { path: 'select', component: SelectTestPage },
  { path: 'test/:id', component: TestPage },
  { path: 'add', component: AddTestPage },
  { path: 'preview', component: PreviewPage },
  { path: 'edit/:id', component: EditTestPage},
  { path: '**', redirectTo: '/select'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
