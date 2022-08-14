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
  public searchKey!: string;
  public loader: boolean = true;
  private albumsSongTemp: Photo[] = [];
  private subs = new SubSink();
  constructor(
    private _api: ApiService
  ) { }

  ngOnInit(): void {
    this.getAlbumsListFromAPi();
  }

  getAlbumsListFromAPi() {
    this.subs.add(
      this._api.getPhotos().subscribe(res => {
        this.albumsList = res;
        this.albumsSongTemp = res;
        this.loader = false;
      })
    );
  }

  onSearch() {
    if (this.searchKey === '') {
      this.albumsList = this.albumsSongTemp;
    }
    this.albumsList = this.albumsSongTemp.filter(song => JSON.stringify(song).toLowerCase().includes(this.searchKey));

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
