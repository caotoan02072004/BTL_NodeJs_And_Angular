import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from './../../../shared/global-constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router ) { };

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  handleSubmit() {
    let formData = this.signupForm.value;
    let data = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }
    console.log(data);
    this.userService.signup(data).subscribe(response => {
      this.responseMessage = response?.message;
      alert("Sign Up Success");
      this.router.navigate(['/login']);
    })
  }
}

