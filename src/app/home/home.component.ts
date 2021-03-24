import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {first, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app-state.model';
import {selectUserData} from '../store/user/user.selectors';
import {UserInfoModel} from '../store/user/user.model';
import {selectProductData} from '../store/product/product.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = false;
  users: UserInfoModel[] = [];
  userData = this.store.select(selectUserData);
  products = this.store.select(selectProductData);

  constructor(
    private userService: UserService,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this.loading = true;

    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
    this.userData.pipe(take(1)).subscribe(user => {
      const userId = user?.id;
      this.userService.getUserProducts(userId).pipe(take(1)).subscribe(products => console.log('product ', products));
    });

  }
}
