import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmsGroupsRoutingModule } from './sms-groups-routing.module';
import { SmsviewListComponent } from './sms-view-list.component';
import { SmsviewEditComponent } from './sms-edit-list.component';
import { SmsAddListComponent } from './sms-add-list.component';
import { SMSPageNotFoundFofComponent } from './sms-pagenotfound';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [SmsviewListComponent, SmsviewEditComponent, SmsAddListComponent, SMSPageNotFoundFofComponent],
  imports: [
    CommonModule,
    SmsGroupsRoutingModule,
    NzTableModule,
    NzModalModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzNotificationModule,
    NzMessageModule,
    NzResultModule,
    NzGridModule,
  ]
})
export class SmsGroupsModule { }
