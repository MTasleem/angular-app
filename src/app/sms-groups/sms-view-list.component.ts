import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SMSService } from '../shared/services/sms.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sms-view-list',
  templateUrl: './sms-view-list.component.html',
  styleUrls: ['./sms-view-list.component.css']
})
export class SmsviewListComponent implements OnInit {
  listOfSMSData: any
  // dateFormat = 'dd/MM/yyyy';
  dateFormat = 'MM/dd/yyyy';
  searchById;
  constructor(
    public smsService: SMSService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    this.initalServiceLoad();
  }

  searchDataById(id) {
    if (id) {
      const fetchById = this.message.loading('Fetching Records..', { nzDuration: 0 }).messageId;
      this.smsService.getById(id)
        .subscribe(data => {
          this.listOfSMSData = data['results'] ? [data['results']] : [];
          this.message.remove(fetchById);
        },
          err => { console.log(err) },
          () => { console.log('completed'); }
        )
    } else {
      let id = this.message.error('Please enter id ...', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 3000);
    }
  }
  initalServiceLoad() {
    const id = this.message.loading('Fetching Records..', { nzDuration: 0 }).messageId;
    this.smsService.getSMSGroupList()
      .subscribe(data => {
        if (data && Object.keys(data).length) {
          this.listOfSMSData = data['results'];
          this.message.remove(id);
        }
      },
        err => { console.log(err) },
        () => { console.log('completed'); })
  }

  startDate: any;
  endDate: any
  searchDataByDates() {
    if (this.startDate && this.endDate) {
      const id = this.message.loading('Fetching Records..', { nzDuration: 0 }).messageId;
      let payload = { start: this.startDate, end: this.endDate };
      this.smsService.filteredSMSListByDates(payload)
        .subscribe(data => {
          if (data && Object.keys(data).length) {
            this.listOfSMSData = data['results'];
            this.message.remove(id);
          }
        },
          err => { console.log(err) },
          () => { console.log('completed'); })
    } else {
      let id = this.message.error('Please enter start date and end date ...', { nzDuration: 0 }).messageId;
      setTimeout(() => {
        this.message.remove(id);
      }, 3000);
    }
  }

  openSMSModalFl = false;
  isVisible = false;
  sendDataToSMSEditList;
  openSMSModal(data) {
    this.isVisible = true;
    this.openSMSModalFl = true;
    this.sendDataToSMSEditList = data;
  }

  deleteSMSModal(data) {
    console.log(data)
    let smsid = data.id;
    let smscity = data.city;
    const id = this.message.loading('Record Deleting..', { nzDuration: 300 }).messageId;
    this.smsService.deleteSMSGroupItem(data.id)
      .subscribe(data => {
        this.notification.success(`${smsid} ${smscity}`, 'Record Deleted')
        this.initalServiceLoad();
        this.message.remove(id);
      },
        err => { console.log(err) },
        () => { console.log('completed'); })
  }

  viewEditSMSListCancel() {
    this.isVisible = false;
    this.openSMSModalFl = false;
  }

  isConfirmLoading = false;
  sendIntimatationButtonIsClicked = false;
  viewEditSMSListOK() {
    this.isConfirmLoading = true;
    this.sendIntimatationButtonIsClicked = true;
    // this.smsService.sendUserId(true);
    this.smsService.sendIntimatation(true);
  }

  getDataFromSMSEditList(data) {
    this.isVisible = false;
    this.openSMSModalFl = false;
    this.isConfirmLoading = false;
    this.initalServiceLoad();
    this.sendDataToSMSEditList = {};
  }
}
