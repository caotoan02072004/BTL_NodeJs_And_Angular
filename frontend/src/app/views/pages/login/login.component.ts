import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { GlobalConstants } from './../../../shared/global-constants';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    console.log(this.loginForm.controls);
  }

  handleSubmit() {
    let formData = this.loginForm.value;
    let data = {
      email: formData.email,
      password: formData.password,
    };
    console.log(data);
    
    this.userService.login(data).subscribe(
      (response: any) => {
        console.log(response);

        localStorage.setItem('token', response.token);
        const user: any = jwtDecode(response.token);
        console.log(user);

        switch (user.role) {
          case 'admin':
            return this.router.navigate(['/admin/read-admin']);
          case 'user':
            return this.router.navigateByUrl('/home/HomeComponent');
          default:
            return this.router.navigateByUrl('/home/no-auth');
        }
      }
    );
    console.log(data);
  }
}
