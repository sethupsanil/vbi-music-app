import { ApiService } from './../core/service/api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Albums, PlayList } from '../core/interface/api-interface.interface';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit, OnDestroy {
  public allSongs: PlayList[] = [];
  public playListSongs: PlayList[] = [];
  private subs = new SubSink();
  constructor(
    private _api: ApiService
  ) { }

  ngOnInit(): void {
    this.getPlaylistFromApi();
  }
  getPlaylistFromApi() {
    this.subs.add(
      this._api.getAlbums().subscribe((res: Albums[]) => this.allSongs = res)
    )
  }
  trackByFn(_index: number, item: PlayList) {
    return item.id;
  }
  addSongToPlaylist(song: PlayList, index: number) {
    this.playListSongs.push(song);
    this.allSongs.splice(index, 1);
  }
  removeSongFromPlaylist(song: PlayList, index: number) {
    this.allSongs.push(song);
    this.playListSongs.splice(index, 1);
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
