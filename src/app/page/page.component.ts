import { UserSharedService } from './../shared.signal/user.shared';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, ViewChild } from "@angular/core";
import { MaterialModule } from "../shared/material/material";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material/sidenav";
import { HomeComponent } from "./home/home.component";

@Component({
  selector: "app-page",
  template:`
    <mat-toolbar class="toolbar">
      <button mat-icon-button (click)="toggleMenu()">
        <mat-icon>menu</mat-icon>
      </button>
      <span style="margin-left: 1.5em">My Work Space </span>
      <span  style="margin-left: auto">Hello, {{currentUser}} !</span>
      <button mat-icon-button style="margin: 0 0.5em" (click)="isDark.set(!isDark())">
        @if(isDark()){
          <mat-icon>dark_mode</mat-icon>
        } @else {
          <mat-icon>light_mode</mat-icon>
        }
      </button>
      <button mat-icon-button (click)="logout()" class="logout"><mat-icon>logout</mat-icon></button>
    </mat-toolbar>
    <mat-sidenav-container class="example-container">
      <mat-sidenav class="sideNav" [ngClass]="!isCollapsed ? 'expanded' : ''" [mode]="isMobile ? 'over' : 'side'" [opened]="isMobile ? 'false' : 'true'">
        <mat-nav-list>
          @for (item of menulist; track $index) {
            <mat-list-item>
                <a [routerLink]="'/' + item.url" class="list-item">
                    <mat-icon>{{item.icon}}</mat-icon>
                    @if (!isCollapsed) {
                      <span>{{item.menu}}</span>
                    }
                </a>
            </mat-list-item>
          }
          </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content style="min-height: 100vh">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterOutlet, RouterModule, HomeComponent],
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  menulist = [
    {
      icon: 'home',
      menu: 'home',
      url: 'page'
    },
    {
      icon: 'person',
      menu: 'user',
      url: 'page/user'
    }
  ];

  router = inject(Router);
  UserSharedService = inject(UserSharedService);
  userInfo = this.UserSharedService.userSignal();
  currentUser = 'Guest';

  // menu toggle
  observer = inject(BreakpointObserver);
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

  //dark mode change
  isDark = signal(false);

  setDarkMode = effect(() => {
    const htmlEl = document.documentElement;
    if (this.isDark()) {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
  })

  userSignal = effect(() => {
    this.currentUser = this.UserSharedService.userSignal().username ?? 'Guest';
  })

  ngOnInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }


  logout(){
    localStorage.removeItem('token');
    this.UserSharedService.userAuthSignal.set(null);
    this.router.navigate(['login']);
  }

}