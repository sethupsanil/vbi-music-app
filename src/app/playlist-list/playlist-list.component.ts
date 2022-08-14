import { HelperService } from './../core/service/helper.service';
import { ApiService } from './../core/service/api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Albums, PlayList } from '../core/interface/api-interface.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit, OnDestroy {
  public allSongs: PlayList[] = [];
  public playListSongs: PlayList[] = [];
  public index!: number;

  private subs = new SubSink();
  constructor(
    private _api: ApiService,
    private _activated: ActivatedRoute,
    private _helper: HelperService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getIndexFromUrl();
    this.getPlaylistFromApi();
  }
  getIndexFromUrl() {
    this.subs.add(
      this._activated.params.subscribe(
        (params) => {
          this.index = +params['index'];
        }
      )
    );
  }

  getPlaylistFromApi() {
    this.subs.add(
      this._api.getAlbums().subscribe((res: Albums[]) => {
        this.allSongs = res;
        this.allSongs.forEach(song => {
          song.duration = `${this._helper.randomIntFromInterval(1, 4)}:${this._helper.randomIntFromInterval()}`;
          song.albumName = this._helper.randomStringFromInterval();
        })
        this.getPlaylistSongFromStorage();
      })
    )
  }

  getPlaylistSongFromStorage() {
    const playlist = JSON.parse(JSON.stringify(this._helper.playListMenu[this.index - 1]));
    this.playListSongs = playlist?.songs ? playlist.songs : [];
  }

  trackByFn(_index: number, item: PlayList) {
    return item.id;
  }

  addSongToPlaylist(song: PlayList, index: number) {
    this.playListSongs.push(song);
    this.allSongs.splice(index, 1);
    this._helper.addSongsToPlaylist(song, this.index - 1)
  }

  removeSongFromPlaylist(song: PlayList, index: number) {
    this.allSongs.unshift(song);
    this.playListSongs.splice(index, 1);
    this._helper.removeSongsToPlaylist(JSON.parse(JSON.stringify(this.playListSongs)), this.index - 1)
  }
  deletePlaylist() {
    this._helper.deletePlaylist(this.index - 1);
    this._router.navigate(['/'])
  }
  shufflePlaylist(){
    this.playListSongs=this._helper.shuffle(this.playListSongs);
    this._helper.removeSongsToPlaylist(JSON.parse(JSON.stringify(this.playListSongs)), this.index - 1)
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
