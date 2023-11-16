import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from 'src/app/services/routeGuard/route-guard-service.service';
import { NoAuthComponent } from './no-auth/no-auth.component';
import {HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'no-auth', component: NoAuthComponent },
  {
    path: 'HomeComponent',
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'user'],
    },
    component: HomeComponent,
  },
  {
    path: 'product',
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'user'],
    },
    component: ProductComponent,
  },
  {
    path: 'cart',
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin', 'user'],
    },
    component: CartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
