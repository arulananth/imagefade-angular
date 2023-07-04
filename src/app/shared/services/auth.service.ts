import { EventEmitter, Injectable, Output } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";

type opts = { redirect?: boolean; exclude?: boolean; url?: string };

@Injectable({
  providedIn: "root",
})
export class AuthService {
  pageCountsPage = [20, 50, 100, 200, 300, 400];
  private _user: any;
  @Output() OnAuth = new EventEmitter<boolean>();

  get user(): any {
    return this._user;
  }

  constructor(private http: ApiService, private router: Router) {
    this.Authenticate();
    this.isAuth();
    if (!this._user) {
      this.OnAuth.emit(false);
    }
  }

  private refAuth: Promise<any>;
  Authenticate(
    options: opts = {
      redirect: false,
      exclude: false,
      url: "",
    }
  ): Promise<any> {
    if (this.refAuth) return this.refAuth;
    return (this.refAuth = new Promise<any>(async (resolve, reject) => {
      this.isAuth(options)
        .then(() => {
          resolve(this.getUser());
        })
        .catch(() => {
          this.http.get("/user/refresh").subscribe(
            () => {
              this.isAuth(options)
                .then(() => resolve(this.getUser()))
                .catch(async () => {
                  if (options.redirect) await this.LoginBack(options);
                  reject();
                });
            },
            async () => {
              if (options.redirect) await this.LoginBack(options);
              reject();
            }
          );
        });
    })).finally(() => {
      this.refAuth = null;
    });
  }
  private refAuthAdmin: Promise<any>;
  AuthenticateAdmin(
    options: opts = {
      redirect: false,
      exclude: false,
      url: "",
    }
  ): Promise<any> {
    if (this.refAuthAdmin) return this.refAuthAdmin;
    return (this.refAuthAdmin = new Promise<any>(async (resolve, reject) => {
      this.isAuth(options)
        .then(() => {
          resolve(this.getAdmin());
        })
        .catch(() => {
          this.http.get("/user/refresh").subscribe(
            () => {
              this.isAuth(options)
                .then(() => resolve(this.getAdmin()))
                .catch(async () => {
                  if (options.redirect) await this.LoginBack(options);
                  reject();
                });
            },
            async () => {
              if (options.redirect) await this.LoginBack(options);
              reject();
            }
          );
        });
    })).finally(() => {
      this.refAuthAdmin = null;
    });
  }

  private refUser: Promise<any>;
  getUser(): Promise<any> {
    if (this.refUser) return this.refUser;
    return (this.refUser = new Promise(async (resolve, reject) => {
      if (this._user) resolve(this._user);
      this.isAuth()
        .then(() => resolve(this._user))
        .catch(() => reject());
    })).finally(() => {
      this.refUser = null;
    });
  }
  private refAdmin: Promise<any>;
  getAdmin(): Promise<any> {
    if (this.refAdmin) return this.refAdmin;
    return (this.refAdmin = new Promise(async (resolve, reject) => {
      if (this._user && this._user.type && this._user.type.name != "admin")
        reject();
      if (this._user && this._user.type && this._user.type.name == "admin")
        resolve(this._user);
      this.isAuth()
        .then(() => resolve(this._user))
        .catch(() => reject());
    })).finally(() => {
      this.refAdmin = null;
    });
  }
  private isAuth(options?: opts): Promise<void> {
    this.OnAuth.emit(false);
    if (this._user && !options?.exclude) {
      this.OnAuth.emit(true);
      return Promise.resolve();
    }
    return new Promise(async (resolve, reject) => {
      this.http.get<any>("/user/auth").subscribe(
        (res: any ) => {
          this._user = res;
          this.OnAuth.emit(true);
          resolve();
        },
        () => {
          this.OnAuth.emit(false);
          reject();
        }
      );
    });
  }

  private LoginBack(options: opts): Promise<boolean> {
    return this.router.navigate(["/login"], {
      queryParams: {
        back: options.url ? options.url : this.router.url,
      },
    });
  }

  Logout() {
    this.http.get("/user/logout").subscribe((data: any) => {
      this.OnAuth.emit(false);
      this.router.navigate(["/"]).then(() => {
        window.location.reload();
      });
      //window.location.reload();
    });
  }
}
