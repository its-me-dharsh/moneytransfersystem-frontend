import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferComponent } from './components/transfer-component/transfer-component';
import { HistoryComponent } from './components/history-component/history-component';
import { DashboardComponent } from './components/dashboard-component/dashboard-component';

const routes: Routes = [
  // Dashboard route (e.g., /dashboard/1)
  { path: 'dashboard/:id', component: DashboardComponent },

  // Transaction history route (e.g., /history/1)
  { path: 'history/:id', component: HistoryComponent },

  // Transfer route (e.g., /transfer)
  { path: 'transfer', component: TransferComponent },

  // Default redirect
  { path: '', redirectTo: '/dashboard/:id', pathMatch: 'full' },

  // { path: '', component: LoginComponent },

  // Wildcard route for 404
  { path: '**',redirectTo: '/dashboard/:id', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
