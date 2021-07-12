import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserRole } from "src/app/enums/user-role";
import { AuthenticationService } from "./authentication.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  public canLoad(): Promise<boolean> {
    return this.checkPermission(null);
  }

  getRoutePermissions(route: ActivatedRouteSnapshot): UserRole[] {
    if (route.data && route.data.userRoles) {
      return route.data.userRoles as UserRole[];
    }
    return null;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const allowedUserRoles = this.getRoutePermissions(route);
    return await this.checkPermission(allowedUserRoles);
  }

  private checkPermission(allowedUserRoles: UserRole[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      for (const allowedRole of allowedUserRoles) {
        if (allowedRole === this.authenticationService.userValue.role) {
          return resolve(true);
        }
      }
      this.router.navigateByUrl('/noPermission');
      return reject(false);
    });
  }
}