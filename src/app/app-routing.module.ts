import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/sms-list' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'sms-list', loadChildren: () => import('./sms-groups/sms-groups.module').then(m => m.SmsGroupsModule) },
  { path: '**', loadChildren: () => import('./sms-groups/sms-groups.module').then(m => m.SmsGroupsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
