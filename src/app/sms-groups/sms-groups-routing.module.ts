import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmsviewListComponent } from './sms-view-list.component';
import { SmsAddListComponent } from './sms-add-list.component';
import { SMSPageNotFoundFofComponent } from './sms-pagenotfound';

const routes: Routes = [
  { path: 'view-list', component: SmsviewListComponent },
  { path: 'add-sms', component: SmsAddListComponent },
  { path: '**', component: SMSPageNotFoundFofComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsGroupsRoutingModule { }
