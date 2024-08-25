import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Iuser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersApi: string = 'https://reqres.in/api/users?page='
  userApi: string = 'https://reqres.in/api/users/'
  constructor(private http: HttpClient) { }


  getUsers(index:number) {
    return this.http.get<any>(`${this.usersApi}${index}`);
  }


  getUserById(id:number) {
    return this.http.get<any>(`${this.userApi}${id}`);

  }

}

