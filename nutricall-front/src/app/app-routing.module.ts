import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ProductComponent} from "./pages/product/product.component";
import {ProductReadComponent} from "./components/product/product-read/product-read.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'products',
    component: ProductComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
