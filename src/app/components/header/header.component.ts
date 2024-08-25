import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FeaturesService } from 'src/app/services/features.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isLightThem: boolean = true;
  // isLightThem: boolean = true;
  hideHeaderElFlag = new BehaviorSubject(false);
  @ViewChild("toggleBtn") BtnMode!: ElementRef;


  constructor(private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private featureService: FeaturesService) { }


  ngOnInit(): void {
    document.body.setAttribute("data-theme", this.featureService.getLightThem() === "true" ? "light" : "dark");

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/users/')) {
          this.hideHeaderElFlag.next(true)
        }
        else {
          this.hideHeaderElFlag.next(false)
        }
      }
    })

  }

  ngAfterViewInit(): void {
    this.toggleThemeBUtton();
  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  toggleMode() {
    this.featureService.setLightThem(!this.isLightThem);
    this.toggleThemeBUtton();
    document.body.setAttribute("data-theme", this.featureService.getLightThem() === "true" ? "light" : "dark")

  }

  toggleThemeBUtton() {
    this.isLightThem = this.featureService.getLightThem() === "true";

    if (!this.isLightThem) {
      this.renderer.removeClass(this.BtnMode.nativeElement, "light-btn");
      this.renderer.addClass(this.BtnMode.nativeElement, "dark-btn");
    }
    else {
      this.renderer.addClass(this.BtnMode.nativeElement, "light-btn");
      this.renderer.removeClass(this.BtnMode.nativeElement, "dark-btn");

    }
  }

}
