import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SMSService } from '../shared/services/sms.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-sms-add-list',
  templateUrl: './sms-add-list.component.html',
  styleUrls: ['./sms-add-list.component.css']
})
export class SmsAddListComponent implements OnInit {
  listOfSMSData = []
  smsAddListForm: FormGroup
  // dateFormat = 'dd/MM/yyyy';
  dateFormat = 'MM/dd/yyyy';

  constructor(
    public smsService: SMSService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initalServiceLoad();
  }

  startDate: any;
  endDate: any;

  onChange(event) {
    this.startDate = this.smsAddListFormControls.start_date ? this.smsAddListFormControls.start_date : '';
    this.endDate = this.smsAddListFormControls.end_date ? this.smsAddListFormControls.end_date : '';
  }

  get smsAddListFormControls() { return this.smsAddListForm.controls; }
  initalServiceLoad() {
    this.smsAddListForm = this.fb.group({
      id: '',
      city: '',
      start_date: '',
      end_date: '',
      price: '',
      status: '',
      color: ''
    });
  }
  AddSMSRecord() {
    let id = this.smsAddListForm.value.id
    let city = this.smsAddListForm.value.city
    let start_date = this.smsAddListForm.value.start_date
    let end_date = this.smsAddListForm.value.end_date
    let price = this.smsAddListForm.value.price
    let color = this.smsAddListForm.value.color
    let status = this.smsAddListForm.value.status

    if (id && city && start_date && end_date && price && status && color) {
      let id = this.message.loading('Adding Records..', { nzDuration: 0 }).messageId;
      this.smsAddListForm.patchValue({
        start_date: moment(this.startDate).format('MM/DD/YYYY'),
        end_date: moment(this.endDate).format('MM/DD/YYYY')
      })
      console.log(this.smsAddListForm.value)
      this.smsService.saveSMSGroupItem(this.smsAddListForm.value)
        .subscribe(data => {
          console.log(data)
          this.message.remove(id);
          this.smsAddListForm.reset();
        })
    } else {
      let id = this.message.error('Please enter all fiels ...', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 3000);
    }
  }

  clearFormControls() {
    this.smsAddListForm.reset();
  }
}
