import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {AccountService} from '../../../services/account.service'
import { GlobalConstants } from 'src/app/shared/global-constants';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-read-admin',
  templateUrl: './read-admin.component.html',
  styleUrls: ['./read-admin.component.scss']
})
export class ReadAdminComponent {
  valueInput = '';
  responseMessage: any;
  data: any;
  p: number = 1;
  adminFormSearch: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(private accountService: AccountService , private userSevice: UserService, private router: Router){
    this.accountData();
  };

  ngOnInit(){ }

  accountData(){
    this.accountService.getAdmin().subscribe((response: any) => {
      this.data = response;
      console.log(this.data);
    },(error) => {
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
    })
  }

  submitSearch() {
    let data = this.adminFormSearch.value.name
    this.accountService.searchAdmin(data).subscribe((response: any) => {
      this.data = response;
    })
    this.adminFormSearch = new FormGroup({
      name: new FormControl('')
    });
  }

  reset(){
   this.accountData()
  }

  changeInput(event: any){

  }

  onEdit(id: number){
    this.data.find( (p: { id: any; }) => {return p.id === id})
    this.router.navigate([`/admin/update-admin/${id}`]);
  }
  onDelete(id: number){
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
          this.accountData()
        })
      }
    })
  }
}