import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal, ViewChild } from "@angular/core";
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
      <span style="margin-left: 1.5em">My Work Space </span>
      <button mat-icon-button (click)="isDark.set(!isDark())" style="margin: 0 0.5em 0 auto">
        @if(isDark()){
          <mat-icon>dark_mode</mat-icon>
        } @else {
          <mat-icon>light_mode</mat-icon>
        }
      </button>
      <button mat-icon-button routerLink="/login" class="logout"><mat-icon>logout</mat-icon></button>
    </mat-toolbar>
    <mat-sidenav-container class="example-container">
      <mat-sidenav class="sideNav" [ngClass]="!isCollapsed ? 'expanded' : ''" [mode]="isMobile ? 'over' : 'side'" [opened]="isMobile ? 'false' : 'true'">
        <mat-nav-list>
          @for (item of menulist; track $index) {
            <mat-list-item>
                <a routerLink={{item.menu}} class="list-item" (click)="closeMenu()">
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