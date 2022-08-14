import { SubSink } from 'subsink';
import { ApiService } from './../core/service/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Photo } from '../core/interface/api-interface.interface';
import { dummyData } from './temp.data';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  public albumsList: Photo[] = [];
  public tempData: Photo[] = dummyData;
  private subs = new SubSink();
  constructor(
    private _api: ApiService
  ) { }

  ngOnInit(): void {
    this.getAlbumsListFromAPi();
  }

  getAlbumsListFromAPi() {
    this.subs.add(
      this._api.getPhotos().subscribe(res => this.albumsList = res)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
