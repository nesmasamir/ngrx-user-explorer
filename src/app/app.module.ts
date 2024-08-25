import { EnvironmentInjector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { appEffects, appReducers } from './main-store/store';
import { CacheInterceptorInterceptor } from './interceptors/cache-interceptor.interceptor';
import { LoadinSpinnerComponent } from './components/loadin-spinner/loadin-spinner.component';
import { LoadingSpinnerInterceptor } from './interceptors/loading-spinner.interceptor';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserComponent,
    UserDetailsComponent,
    PaginationComponent,
    SearchBoxComponent,
    LoadinSpinnerComponent,
    FilterPipe,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({ logOnly: false })

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:CacheInterceptorInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoadingSpinnerInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }  
