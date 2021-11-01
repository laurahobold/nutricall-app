import {Component, OnInit} from '@angular/core';
import {Product} from "../product.model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  product: Product | undefined

  constructor(public dialogRef: MatDialogRef<ProductModalComponent>,) {
  }

  ngOnInit(): void {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.closeModal();
      }
    });

    this.dialogRef.backdropClick().subscribe(event => {
      this.closeModal();
    });

  }

  closeModal() {
    this.dialogRef.close();
  }

}
