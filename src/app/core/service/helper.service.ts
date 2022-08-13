import { PlayListMenu } from './../interface/api-interface.interface';
import { Injectable } from '@angular/core';
import { localStorageKey } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public playListMenu: PlayListMenu[] = [];
  constructor() { }
  setLocalStorage(name: string, value: object) {
    localStorage.setItem(name, JSON.stringify(value));
  }
  createNewPlayList() {
    this.playListMenu.push({
      name: `My Playlist #${this.playListMenu.length + 1}`
    });
    this.setLocalStorage(localStorageKey.playlist, this.playListMenu);
  }
  setPlaylistMenu() {
    this.playListMenu = this.getLocalStorage(localStorageKey.playlist);
  }
  getLocalStorage(key: string) {
    return JSON.parse(<string>localStorage.getItem(key));
  }
}
