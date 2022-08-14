import { PlayListMenu, Albums } from './../interface/api-interface.interface';
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
      name: `My Playlist #${this.playListMenu.length + 1}`,
      songs: []
    });
    this.setLocalStorage(localStorageKey.playlist, this.playListMenu);
  }

  addSongsToPlaylist(song: Albums, index: number) {
    this.playListMenu[index].songs?.push(song);
    this.setLocalStorage(localStorageKey.playlist, this.playListMenu);
  }

  removeSongsToPlaylist(songs: Albums[], index: number) {
    this.playListMenu[index].songs = songs;
    this.setLocalStorage(localStorageKey.playlist, this.playListMenu);
  }
  deletePlaylist(index: number) {
    this.playListMenu.splice(index, 1);
    this.setLocalStorage(localStorageKey.playlist, this.playListMenu);
  }
  setPlaylistMenu() {
    this.playListMenu = this.getLocalStorage(localStorageKey.playlist) ? this.getLocalStorage(localStorageKey.playlist) : [];
  }

  getLocalStorage(key: string) {
    return JSON.parse(<string>localStorage.getItem(key));
  }
  randomIntFromInterval(min: number = 0, max: number = 59) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  randomStringFromInterval(count: number = 10) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < count; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  shuffle(array: any[]) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
}
