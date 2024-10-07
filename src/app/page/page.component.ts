import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from "@angular/core";
import { MaterialModule } from "../shared/material/material";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: "app-page",
  template:`
  @if(router.url === '/login') {
    <router-outlet></router-outlet>
  }
  @else {

    <mat-toolbar class="toolbar">
      <button mat-icon-button (click)="toggleMenu()">
        <mat-icon>menu</mat-icon>
      </button>
      <span style="margin-left: 1.5em">My Todo App </span>
      <div class="container">
      <h1 class="title">1223</h1>
    </div>
      <button mat-button routerLink="/login" class="logout">Logout</button>
    
    </mat-toolbar>
    <mat-sidenav-container class="example-container">
      <mat-sidenav class="sideNav" [ngClass]="!isCollapsed ? 'expanded' : ''" [mode]="isMobile ? 'over' : 'side'" [opened]="isMobile ? 'false' : 'true'">
        <mat-nav-list>
          @for (item of menulist; track $index) {
            <mat-list-item>
                <a routerLink={{item.menu}} class="list-item" (click)="closeMenu()">
                    <mat-icon>{{item.icon}}</mat-icon>
                    @if (!isCollapsed) {
                      <span class="item-name">{{item.menu}}</span>
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
  }
  `,
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterOutlet, RouterModule],
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  menulist = [
    {
      icon: 'home',
      menu: 'home'
    },
    {
      icon: 'person',
      menu: 'user'
    }
  ];

  router = inject(Router);
  observer = inject(BreakpointObserver);
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

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

  closeMenu(){
    this.sidenav.close();
  }

}