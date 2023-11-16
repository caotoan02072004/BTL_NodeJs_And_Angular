import { GlobalConstants } from './../../../shared/global-constants';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from './../../../services/category.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-read-category',
  templateUrl: './read-category.component.html',
  styleUrls: ['./read-category.component.scss']
})
export class ReadCategoryComponent implements OnInit {
  valueInput = '';
  responseMessage: any;
  data: any;
  p: number = 1;
  categoryFormSearch: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  constructor(private categoryService: CategoryService, private userService: UserService, private router: Router) {
    this.categoryData();
  };

  ngOnInit() { }


  categoryData() {
    this.categoryService.getCategory().subscribe((response: any) => {
      this.data = response;
      console.log(this.data);
    }, (error) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
    })
  }
  changeInput(event: any) {
  }

  submitSearch() {
    let data = this.categoryFormSearch.value.name
    this.categoryService.searchCategory(data).subscribe((response: any) => {
      this.data = response;
    })
    this.categoryFormSearch = new FormGroup({
      name: new FormControl('')
    });
  }

  reset(){
    this.categoryData()
  }

  onEditCategory(id: string) {
    let currentCategory = this.data.find( (p: { id: any; }) => {return p.id === id})
    this.router.navigate([`/category/update-category/${id}`]);
  }

  onDeleteCategory(id: number) {
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
        this.categoryService.deleteCategory(id).subscribe(response => {
          this.categoryData()
        })
      }
    })
  }
}
