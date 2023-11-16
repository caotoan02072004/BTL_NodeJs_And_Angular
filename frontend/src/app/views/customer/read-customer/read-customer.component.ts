import { Component } from '@angular/core';
import { AccountService } from './../../../services/account.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constants';
import Swal from 'sweetalert2'
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-read-customer',
  templateUrl: './read-customer.component.html',
  styleUrls: ['./read-customer.component.scss']
})
export class ReadCustomerComponent {
  valueInput = '';
  responseMessage: any;
  data: any = [];
  p: number = 1;
  customerFormSearch: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(private accountService: AccountService, private userService: UserService, private router: Router) {
    this.customerData();
  };

  ngOnInit() { }

  customerData() {
    this.accountService.getUser().subscribe((response: any) => {
      this.data = response;
      console.log(this.data);
    }, (error) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
    })
  }
  changeInput(event: any) {
    this.valueInput = event.target.value;
  }

  submitSearch() {
    this.accountService.searchUser(this.valueInput).subscribe((response: any) => {
      this.data = response;
    })
    this.customerFormSearch = new FormGroup({
      name: new FormControl('')
    });
  }

  reset(){
    this.customerData();
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.accountService.deleteUser(id).subscribe(response => {
          this.customerData()
        })
      }
    })
  }


  onEdit(id: number) {

  }
}
