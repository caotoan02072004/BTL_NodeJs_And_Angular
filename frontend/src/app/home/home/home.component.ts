import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  valueInput = ''
  responseMessage: any;
  data: any;
  saledata: any;
  carts: any = this.userService.getCarts();
  p: number = 1;
  user: any;
  productFormSearch: FormGroup = new FormGroup({
    name: new FormControl('')
  })
  // userService lấy tên này để  vào user đang báo đỏ, test thử xem dc chưa

  constructor(private productService: ProductService, private userService: UserService, private router: Router){
    this.productData();
    this.productSale();
  };

  ngOnInit(){ }

  productData() {
    this.productService.getProduct().subscribe((response: any) => {
      this.data = response;
      console.log(this.data);
    },(error) => {
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError
      }
  })
  }

  productSale() {
    this.productService.getSalePrice().subscribe((response: any) => {
      this.saledata = response;
      console.log(this.saledata);
    },(error) => {
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

  onFavorite(id: number){
    
  }

  onAddToCart(product: any){
    let idx = this.carts.findIndex((item: any) => {
      return item.id == product.id
    });

    if(idx >= 0) {
      this.carts[idx].quantity += 1;
    }else{
      let cartItem: any = {
        id: product.id,
        image: product.image,
        name: product.name,
        price: product.sale_price ? product.sale_price : product.price,
        quantity: 1,
        subtoTal: function ( ) {
          return this.price * this.quantity;
        }
      }
      this.carts.push(cartItem);
    }
    this.userService.saveCart( this.carts);
    Swal.fire({
      title: "Thêm vào giỏ hàng thành công",
      icon: "success",
    });    
  }


}
