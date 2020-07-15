import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SMSService } from '../shared/services/sms.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-sms-edit-list',
  templateUrl: './sms-edit-list.component.html',
  styleUrls: ['./sms-edit-list.component.css']
})
export class SmsviewEditComponent implements OnInit {
  @Input() getDataFromSMSViewList: any;
  @Output() sendDataFromSMSEditList = new EventEmitter<any>();;

  public smsUserEditForm: FormGroup;

  // dateFormat = 'dd/MM/yyyy';
  dateFormat = 'MM/dd/yyyy';

  constructor(public smsService: SMSService, private formBuilder: FormBuilder) { }

  setDataFromSMSViewList = [];
  ngOnInit() {
    this.setDataFromSMSViewList = [this.getDataFromSMSViewList];
    if (this.getDataFromSMSViewList && Object.keys(this.getDataFromSMSViewList).length) {
      this.smsUserEditForm = this.formBuilder.group({
        id: this.getDataFromSMSViewList['id'],
        city: this.getDataFromSMSViewList['city'],
        start_date: this.getDataFromSMSViewList['start_date'],
        end_date: this.getDataFromSMSViewList['end_date'],
        price: this.getDataFromSMSViewList['price'],
        status: this.getDataFromSMSViewList['status'],
        color: this.getDataFromSMSViewList['color'],
      });
    }
    this.updateValue();
  }

  countService = 1;
  updateValue() {
    this.smsService.sendIntimatationButtonIsClicked$
      .subscribe(data => {
        console.log(this.smsUserEditForm.value)
        console.log(data)
        if (data && this.countService == 1) {
          this.needToUpdateDocument();
        }
      })
  }

  get smsUserEditFormFormControls() { return this.smsUserEditForm.controls; }

  needToUpdateDocument() {
    this.smsUserEditForm.patchValue({
      start_date: moment(this.smsUserEditFormFormControls['start_date'].value).format('MM/DD/YYYY'),
      end_date: moment(this.smsUserEditFormFormControls['end_date'].value).format('MM/DD/YYYY')
    })

    this.smsService.updateSmsUpdate(this.smsUserEditForm.value)
      .subscribe(data => {
        console.log(data)
        this.smsService.sendIntimatation(null);
        this.sendDataFromSMSEditList.emit({ value: this.smsUserEditForm.value, stopLoader: false });
        this.countService = this.countService + 1

      })
  }
}
