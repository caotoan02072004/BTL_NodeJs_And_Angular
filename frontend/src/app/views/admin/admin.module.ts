import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin.routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ReadAdminComponent } from './read-admin/read-admin.component';
import { PostAdminComponent } from './post-admin/post-admin.component';
import { UpdateAdminComponent } from './update-admin/update-admin.component';


@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [
    ReadAdminComponent,
    PostAdminComponent,
    UpdateAdminComponent
  ]
})
export class AdminModule {
}
