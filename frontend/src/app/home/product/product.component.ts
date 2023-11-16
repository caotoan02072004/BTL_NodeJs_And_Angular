import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  inputValue = '';
  responseMessage: any;
  data: any;
  carts: any = this.userService.getCarts();
  p: number = 1;
  
  productFormSearch: FormGroup = new FormGroup({
    name: new FormControl('')
  })

  constructor(private productService: ProductService, private userService: UserService, private router: Router){
    this.productData();
  }

  ngOnInit(){}

  productData(){
    this.productService.getProduct().subscribe((response) => {
      this.data = response
    })
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
