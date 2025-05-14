
import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Menubar } from 'primeng/menubar';
import { User } from '../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar',
  imports: [Menubar, BadgeModule, AvatarModule, InputTextModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private _user: UserService) { }

  user: User | undefined;

  items: MenuItem[] | undefined;

  ngOnInit() {
    
    this.user = this._user.GetUser();
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
      },
    ];
  }
}
