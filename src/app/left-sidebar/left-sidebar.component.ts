import { PlayListMenu } from './../core/interface/api-interface.interface';
import { HelperService } from './../core/service/helper.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  constructor(
    public _helper: HelperService,
    private _router: Router) { }

  ngOnInit(): void {
    this._helper.setPlaylistMenu();
  }
  createNewPlaylist() {
    this._helper.createNewPlayList();
  }
  gotoPlaylist(item: PlayListMenu) {
    this._router.navigate([`playlist/${item.name.split('#')[1]  }`])
  }
}
