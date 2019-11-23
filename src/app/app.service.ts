import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  
  public recentPhotosUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=2b3f6c34ed79f3d8a1cb429ca7d094e4&tags=fruits&text=fruits&sort=relevance&per_page=90&format=json&nojsoncallback=1";
  public fetchPhotoUrl = "https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=2b3f6c34ed79f3d8a1cb429ca7d094e4&photo_id=";

  constructor(public http:HttpClient) { }

  public setReviewInfoInLocalStorage = (reviewInfo) =>{
    localStorage.setItem(`${reviewInfo.reviewId}`, JSON.stringify(reviewInfo))
  };

  public getReviewInfoFromLocalstorage = (reviewId) => {
    return JSON.parse(localStorage.getItem(`${reviewId}`));
  };

  public recentPhotos():Observable<any> {
    return this.http.get(`${this.recentPhotosUrl}`)
  }

  public fetchPhoto(photoId):Observable<any> {
    return this.http.get(`${this.fetchPhotoUrl}${photoId}&format=json&nojsoncallback=1`)
  }

}
