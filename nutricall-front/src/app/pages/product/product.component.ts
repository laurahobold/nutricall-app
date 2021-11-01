import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {HeaderService} from "../../components/layout/header/header.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private router: Router,
              private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Products',
      icon: 'lunch_dining',
      routeUrl: '/products'
    }
  }

  ngOnInit(): void {
  }


}
