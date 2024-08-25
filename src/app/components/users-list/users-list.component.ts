import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { IAppState } from 'src/app/main-store/store';
import { getUser, getUsers } from 'src/app/main-store/users.actions';
import { selectAllUsers, selectCurrentPage, selectTotalPages } from 'src/app/main-store/users.selectors';
import { Iuser } from 'src/app/model/user.model';
import { FeaturesService } from 'src/app/services/features.service';
import { LoaderSpinnerService } from 'src/app/services/loader-spinner.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: Iuser[] = [];
  totalPges: number = 0;
  currentPage: number = 0;
  serchText: string = '';
  readonly loader$ = this.loadingSpinner.isLoadin$;
  constructor(private featureService: FeaturesService, private store: Store<IAppState>,
    private loadingSpinner: LoaderSpinnerService
  ) { }

  ngOnInit(): void {
    this.featureService.searchInpText.next('')
    this.store.pipe(select(selectAllUsers)).subscribe(
      {
        next: (userdata) => {
          this.users = userdata;

        },
        error: (error) => {
          console.log(error)
        }
      }
    )

    this.store.pipe(select(selectTotalPages)).subscribe({
      next: (totalPages) => {
        this.totalPges = totalPages
      },
      error: (error) => {
        console.log(error)
      }

    })
    this.store.pipe(select(selectCurrentPage)).subscribe({
      next: (currentPage) => {
        this.currentPage = currentPage
      },
      error: (error) => {
        console.log(error)
      }

    })

    this.store.dispatch(getUsers({ pageIndex: this.currentPage }));

    this.featureService.searchInpText.subscribe(val => {
      this.serchText = val;
      
    })
  }



  changePageIndex(index: number) {
    // this.serchText = ' ';
    if (index !== this.currentPage) {
      this.store.dispatch(getUsers({ pageIndex: index }));
      this.store.select("usersData").subscribe(userdata => {
        this.currentPage = userdata.page
      })
    }

  }
  
}
