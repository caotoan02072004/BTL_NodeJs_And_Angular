import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {
  productFormPost: any = FormGroup;
  responseMessage:any;
  cateId: any = [];

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router, private cate: CategoryService){ };
  ngOnInit(): void{
    this.cate.getCategory().subscribe(response => {
      console.log('đay la dât cate tren product page ',response)
      this.cateId = response;
    })
    
    this.productFormPost = this.formBuilder.group({
      name: ['', [Validators.required]],
      price:['', [Validators.required]],
      sale_price: ['',[Validators.required]],
      image:['', [Validators.required]],
      category_id:['', [Validators.required]],
    })
  }

  
  
  handleSubmit(){
    let formData = this.productFormPost.value;
    let data = {
      name: formData.name,
      price: formData.price,
      sale_price: formData.sale_price,
      image: formData.image,
      category_id: formData.category_id
    }
    console.log(data);
    
    this.productService.postProduct(data).subscribe(response => {
      this.responseMessage = response?.message;
      this.router.navigate(['/product/read-product']);
    })
  }
}
