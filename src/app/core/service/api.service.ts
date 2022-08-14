import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndPoints } from '../config/api-endpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient
  ) { }

  getAlbums(): Observable<any> {
    return this._http.get(`${environment.baseUrl}${ApiEndPoints.albums}`)
  }

  getPhotos(): Observable<any> {
    return this._http.get(`${environment.baseUrl}${ApiEndPoints.photos}`)
  }
}
