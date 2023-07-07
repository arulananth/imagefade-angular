import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userRole: any;
  userEmail: any;

  constructor(
    private authservice: AuthService
  ) {
    this.userRole = this.authservice.userRole;
    this.userEmail = this.authservice.userEmail;
    console.log('userRole',this.userRole);
  }

  ngOnInit(): void {

  }

  logout(){
    this.authservice.logOut();
  }

}
