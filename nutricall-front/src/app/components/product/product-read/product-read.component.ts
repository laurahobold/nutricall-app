import {Component, OnInit} from '@angular/core';
import {Product} from "../product.model";
import {ProductService} from "../product.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProductModalComponent} from "../product-modal/product-modal.component";

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  products: Product[] | undefined;

  constructor(private productService: ProductService,
              public matDialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.productService.read().subscribe(async (products) => {
      this.products = products;
      this.productService.showMessage("Success on load products!")
    }, error => this.productService.errorHandler("Error on get products!"));
  }

  correctName(name: String): String {
    return name.length > 35 ? name.slice(0, 30) + "..." : name;
  }

  openModal(product: Product): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "product-modal-component";
    dialogConfig.autoFocus = true;
    const modalDialog = this.matDialog.open(ProductModalComponent, dialogConfig);
    modalDialog.componentInstance.product = product
  }
}




