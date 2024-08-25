import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Iuser } from 'src/app/model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() userdata: Iuser = { avatar: "", email: "", first_name: "", last_name: "", id: 0 };
  constructor() { }

  ngOnInit(): void {

  }


}
