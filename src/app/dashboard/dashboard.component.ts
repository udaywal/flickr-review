import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isShow: boolean;
  public topPosToStartShowing = 100;

  public config: any;
  public collection = { count: 90, data: [] };

  constructor(    
    public appService: AppService, public router: Router,
    public toastr: ToastrService
    ) { 
      this.config = {
        itemsPerPage: 30,
        currentPage: 1,
        totalItems: this.collection.count
      };
    }

  ngOnInit() {
    this.getRecentPhotos();
  }

  public getRecentPhotos():any {
    this.appService.recentPhotos().subscribe(
      (apiResponse) => {
        if(apiResponse.photos){
          this.collection.data = apiResponse.photos.photo
        } else {
          this.toastr.error("server error")
        }
      }, (err)=> {
        this.toastr.error('Something went wrong!')
      }
    )
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  @HostListener('window:scroll')
  checkScroll() {
    
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
