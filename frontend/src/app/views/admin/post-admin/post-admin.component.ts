import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CategoryService } from 'src/app/services/category.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-post-admin',
  templateUrl: './post-admin.component.html',
  styleUrls: ['./post-admin.component.scss']
})
export class PostAdminComponent {
  adminFormPost: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder, private adminService: AccountService, private router: Router) { };
  ngOnInit(): void {
    this.adminFormPost = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  handleSubmit() {
    let formData = this.adminFormPost.value;
    let data = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }
  console.log(data);
    this.adminService.postAdmin(data).subscribe(response => {
      this.router.navigate(['/admin/read-admin']);
    })
  }
}
