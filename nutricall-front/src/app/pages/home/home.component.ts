import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../../components/layout/header/header.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.headerData = {
      title: 'Home',
      icon: 'home',
      routeUrl: ''
    };
  }

}
