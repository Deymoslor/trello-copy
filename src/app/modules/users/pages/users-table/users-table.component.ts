import { Component, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';

import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit  {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null = null

  constructor(
    private usersService: UsersService,
    private authSerivce: AuthService
  ) {
    
  }

  ngOnInit(): void {
    this.getUsers()
    this.authSerivce.user$
    .subscribe(user => {
      this.user = user
    })
  }

  getUsers(){
    this.usersService.getUsers()
    .subscribe(users => {
      this.dataSource.init(users)
    })
  }

}
