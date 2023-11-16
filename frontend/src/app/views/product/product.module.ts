import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product.routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReadProductComponent } from './read-product/read-product.component';
import { PostProductComponent } from './post-product/post-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';


@NgModule({
  imports: [
    ProductRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    ReadProductComponent,
    PostProductComponent,
    UpdateProductComponent
  ]
})
export class ProductModule {
}
