import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Url } from '../url';
import { NotifierService } from 'angular-notifier';
import Utils from '../Utils';

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.css']
})
export class UrlListComponent implements OnInit {

  urls: Url[]

  constructor(private appService: AppService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.fetchUrls();
  }

  fetchUrls() {
    this.appService.getAll()
      .subscribe(urls => this.urls = urls, data => {
        this.notifier.notify('error', Utils.getErrorMessage(data));
      });
  }

  openLink(urlId: string) {
    window.open(this.appService.BASE_URL + urlId);
  }

  delete(id: number) {
    this.appService.delete(id).subscribe(data => {
      this.notifier.notify('success', 'Successfully deleted.');
      this.deleteFromList(id);
    }, data => {
        this.notifier.notify('error', Utils.getErrorMessage(data));
    });
  }

  deleteFromList(id: number) {
    for (let i = 0; i < this.urls.length; i++) {
        if (this.urls[i].id === id) {
          this.urls.splice(i, 1);
        }
    }
  }
}
