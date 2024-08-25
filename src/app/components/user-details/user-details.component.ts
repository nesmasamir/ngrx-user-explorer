import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState} from 'src/app/main-store/store';
import { getUser } from 'src/app/main-store/users.actions';
import { Iuser } from 'src/app/model/user.model';
import { LoaderSpinnerService } from 'src/app/services/loader-spinner.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: Iuser | null = {
    avatar: '',
    first_name: '',
    last_name: '',
    email: '',
    id: 0
  }
  constructor(private userService: UsersService,
    private router: Router,
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private loadingSpinner: LoaderSpinnerService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(getUser({ id: Number(id) }));
    this.store.select("usersData").subscribe((data) => {
      if(!data.loading){
        this.user = data.singleUser;
      }
    })
  }


  back() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  readonly loader$ = this.loadingSpinner.isLoadin$;

  
}
