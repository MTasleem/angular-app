import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SMSModel } from '../models/sms.model';

@Injectable({
  providedIn: 'root'
})
export class SMSService {

  uri = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getSMSGroupList(): Observable<SMSModel[]> {
    return this.http.get<SMSModel[]>(`${this.uri}/smslists`);
  }

  filteredSMSListByDates(payload) {
    return this.http.post(`${this.uri}/smslists/filterByDate`, payload);
  }

  saveSMSGroupItem(payload) {
    return this.http.post(`${this.uri}/smslists/save`, payload);
  }

  updateSmsUpdate(payload) {
    return this.http.post(`${this.uri}/smslists/update`, payload);
  }

  deleteSMSGroupItem(id) {
    return this.http.delete(`${this.uri}/smslists/delete/${id}`);
  }

  getById(id) {
    return this.http.get(`${this.uri}/smslists/${id}`);
  }

  sendIntimatationButtonIsClicked$: BehaviorSubject<string> = new BehaviorSubject(null);
  sendIntimatation(policyList?) {
    this.sendIntimatationButtonIsClicked$.next(policyList);
  }

}
