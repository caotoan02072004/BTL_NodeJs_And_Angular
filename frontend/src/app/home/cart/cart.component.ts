import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  carts: any = [];
  constructor(private user: UserService){}

  ngOnInit(): void {
    this.carts = this.user.getCarts();
  }

  subtotal(cart: any){
    return cart.quantity * cart.price;

  }

  updateQuantity(idx: number, ev: any){
    let newQuantity = ev.target.value;
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    ev.target.value = newQuantity;
    this.carts[idx].quantity = ev.target.value    
  }

  removecart(idx: number) {
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
        this.carts.splice(idx, 1);
        this.user.saveCart(this.carts);
      }
    })
  }

  onClearCart() {
    let _this = this;
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
        sessionStorage.clear();
        _this.carts = [];
      }
    })
  }
}
