import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { NoAuthComponent } from './no-auth/no-auth.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [HomeRoutingModule, CommonModule, NgxPaginationModule],
  declarations: [
    NoAuthComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    AboutComponent,
    CartComponent,
  ],
})
export class HomeModule {}
