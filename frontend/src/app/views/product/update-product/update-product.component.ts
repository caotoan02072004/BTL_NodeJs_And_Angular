import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent {
  productFormUpdate = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    sale_price: new FormControl(''),
    image: new FormControl(''),
    category_id: new FormControl(''),
  });
  responseMessage: any;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router){ };

  ngOnInit(): void{
    this.productService.getOneProduct(this.route.snapshot.params['id']).subscribe((response: any) => {
      this.productFormUpdate = new FormGroup({
        name: new FormControl(response[0].name),
        price: new FormControl(response[0].price),
        sale_price: new FormControl(response[0].sale_price),
        image: new FormControl(response[0].image),
        category_id: new FormControl(response[0].category_id),
      });
    });
  }

  handleSubmit(){
    let formData = this.productFormUpdate.value;
    let data = {
      name: formData.name,
      price: formData.price,
      sale_price: formData.sale_price,
      image: formData.image,
      category_id: formData.category_id,
    }
    console.log(data);
    
    this.productService.updateProduct(this.route.snapshot.params['id'], data).subscribe((response: any) => {
      this.responseMessage = response?.message;
      this.router.navigate(['/product/read-product']);
    })
  }

}
