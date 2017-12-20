import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TestPage } from './pages/test/test.page';
import { SelectTestPage } from './pages/select-test/select-test.page';
import { AddTestPage } from './pages/add-test/add-test.page';
import { PreviewPage } from './pages/preview/preview.page';
import { EditTestPage } from './pages/edit-test/edit-test.page';
import { ResultsPage } from './pages/results/results.page';
import { TestGuard } from './services/test.guard';
import { CurrentTestGuard } from './services/current-test.guard';
import { HomePage } from './pages/home/home.page';


const routes: Routes = [
  { path: 'select', component: SelectTestPage, canActivate: [CurrentTestGuard] },
  { path: 'test/:id', component: TestPage, canDeactivate: [TestGuard] },
  { path: 'add', component: AddTestPage },
  { path: 'home', component: HomePage},
  { path: 'preview', component: PreviewPage },
  { path: 'edit/:id', component: EditTestPage},
  { path: 'results/:id', component: ResultsPage },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
