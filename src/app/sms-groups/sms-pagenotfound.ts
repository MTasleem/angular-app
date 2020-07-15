import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nz-demo-result-fof',
  template: `
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="Sorry, the page you visited does not exist.">
      <div nz-result-extra>
        <button nz-button nzType="primary" (click)="redirect()">Back Home</button>
      </div>
    </nz-result>
  `
})
export class SMSPageNotFoundFofComponent {
  constructor(private router: Router) { }
  redirect() {
    this.router.navigate(['/sms-list/view-list']);
  }
}