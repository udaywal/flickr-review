import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  public reviewBy: string;
  public ratings: number;
  public reviewDescription: string;

  public reviewInfo: any;

  public imageId: any;
  public photoInfo: any;
  public photoBy: string;
  public photoDescription: string;

  public showReview: any;
  public reviewId: any;
  public showReviewBy: any;
  public showRatings: any;
  public showReviewDescription: any;

  public isReview: boolean = false;

  constructor(
    public appService: AppService, public router: Router,
    public toastr: ToastrService, public _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.imageId = this._route.snapshot.paramMap.get('imageId');
    this.fetchPhoto();
    this.showReview = this.appService.getReviewInfoFromLocalstorage(this.imageId);
    console.log(this.showReview)
    if(this.showReview === null || this.showReview === undefined || this.showReview === 0){
      this.isReview = false
    }else{
      this.loadReview();
    }
  }

  public loadReview():any {
    if(this.showReview.reviewId == this.imageId){
      this.isReview = true
      this.reviewId = this.showReview.reviewId
      this.showReviewBy = this.showReview.showReviewBy
      this.showRatings = this.showReview.showRatings
      this.showReviewDescription = this.showReview.showReviewDescription
    } else {
      this.isReview = false
    }
  }

  public fetchPhoto():any {
    this.appService.fetchPhoto(this.imageId).subscribe(
      (apiResponse) => {
        if(apiResponse.photo){
          this.photoInfo = apiResponse.photo
          this.photoBy = this.photoInfo.owner.realname
          this.photoDescription = this.photoInfo.description._content
          console.log(this.photoInfo)
        } else {
          this.toastr.error("server error")
        }
      }, (err)=> {
        this.toastr.error('Something went wrong!')
      }
    )
  }

  public addReview():any {
    this.reviewInfo = {
      reviewId: this.imageId,
      showReviewBy: this.reviewBy,
      showRatings: this.ratings,
      showReviewDescription: this.reviewDescription
    }
    this.appService.setReviewInfoInLocalStorage(this.reviewInfo);
    this.toastr.success('Review added!')
    setTimeout(()=>{
      this.router.navigate(['/'])
    }, 2000)
  }

}
