import { GlobalConstants } from './../../../shared/global-constants';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component } from '@angular/core';
import { ProductService } from './../../../services/product.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-read-product',
  templateUrl: './read-product.component.html',
  styleUrls: ['./read-product.component.scss']
})
export class ReadProductComponent {
  valueInput = '';
  responseMessage: any;
  data: any;
  p: number = 1;
  productFormSearch: FormGroup = new FormGroup({
    name: new FormControl('')
  })

  constructor(private productService: ProductService, private userService: UserService, private router: Router) {
    this.productData();
  };

  ngOnInit() { }

  productData() {
    this.productService.getProduct().subscribe((Response: any) => {
      this.data = Response;
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

  changeInput(event: any){
    this.valueInput = event.target.value;
  }

  submitSearch(){
    this.productService.searchProduct(this.valueInput).subscribe((response: any) => {
      this.data = response;
    })
    this.productFormSearch = new FormGroup({
      name: new FormControl('')
    });
  }

  reset(){
    this.productData();
  }

  onEditProduct(id: number){
    let currentProduct = this.data.find( (p: { id: any; }) => {return p.id === id})
    this.router.navigate([`/product/update-product/${id}`]);
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
        this.productService.deleteProduct(id).subscribe(response => {
          this.productData()
        })
      }
    })
  }

}
