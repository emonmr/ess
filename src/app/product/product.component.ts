import {Component, OnInit} from '@angular/core';
import {selectUserData} from '../store/user/user.selectors';
import {UserService} from '../services/user.service';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app-state.model';
import {take} from 'rxjs/operators';
import {ProductActions} from '../store/product/product.actions';
import {selectProductData} from '../store/product/product.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  loading = false;
  userData = this.store.select(selectUserData);
  products = this.store.select(selectProductData);

  constructor(
    private userService: UserService,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    this.loading = true;

    this.userData.pipe(take(1)).subscribe(user => {
      const userId = user?.id;
      this.userService.getUserProducts(userId).pipe(take(1)).subscribe(products => {
        this.loading = false;
        this.store.dispatch(new ProductActions.AddProduct(products));
      });
    });

  }

}
