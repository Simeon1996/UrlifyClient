import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NotifierService } from 'angular-notifier';

import { UrlListComponent } from '../url-list/url-list.component';
import Utils from '../Utils';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.css']
})
export class UrlFormComponent implements OnInit {
  
  @Input() listComponent: UrlListComponent;

  private url: string;
  public formData: FormGroup;

  constructor(private fb: FormBuilder, private appService: AppService, private notifier: NotifierService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formData = this.fb.group({
      // @TODO add url validation regex 
      url: ['', [Validators.required, Validators.minLength(7)]]
    })
  }

  onSubmit(data) {
     this.url = data.url;
     
     if (this.url && this.url.length > 0 && !this.formData.controls.url.errors) {
      this.appService.create(this.url).subscribe(data => {
        // @TODO instead of making a request to get the data -> simply add the newly created record within the urls list
        this.listComponent.fetchUrls();

        this.formData.reset();
        this.notifier.notify('success', 'Successfully created.');
      }, data => {
        this.notifier.notify('error', Utils.getErrorMessage(data));
        this.formData.reset();
      }); 
     }
  }

}
