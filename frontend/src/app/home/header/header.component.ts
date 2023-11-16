import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  valueInput = '';
  responseMessage: any;
  data: any;
  productFormSearch: FormGroup = new FormGroup({
    name: new FormControl('')
  })

  constructor(private productService: ProductService, private userService: UserService,private router: Router){ }
  ngOnInit(){}
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  changeInput(event: any){
    this.valueInput = event.target.value;
  }

  submitSearch(){
    this.productService.searchProduct(this.valueInput).subscribe((response: any) => {
      this.data = response
    })
    this.productFormSearch = new FormGroup({
      name: new FormControl('')
    });
  }
}
