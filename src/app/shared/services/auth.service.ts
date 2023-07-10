import { EventEmitter, Injectable, Output } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  userId: any;
  userRole: any;
  userEmail: any;

  constructor(
    private http: ApiService,
    private router: Router,
    private location: Location
    ) {
      let user: any = localStorage.getItem('currentUser');
      if (user) {
        user = JSON.parse(user);
        this.userId = user._id;
        this.userRole = user.role;
        this.userEmail = user.email;

      }
     }

  logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('Token');
    this.userRole = null; // Set userRole to null upon logout
    // this.router.navigate(['/pages/home']);
    this.location.go('/pages/home');
    location.reload();
  }

}
