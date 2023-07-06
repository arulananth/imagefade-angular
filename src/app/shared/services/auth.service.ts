import { EventEmitter, Injectable, Output } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(
    private http: ApiService,
    private router: Router
    ) { }

  logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('Token');
    this.router.navigate(['/auth/login']);
  }

}
