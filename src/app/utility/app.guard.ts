import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivateFn,
  Router,
  RouterStateSnapshot, UrlTree,
} from '@angular/router';
import {AuthGuardData, createAuthGuard} from 'keycloak-angular';
import Keycloak from "keycloak-js";

const isAccessAllowed = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authData: AuthGuardData,
): Promise<boolean | UrlTree> => {
  const router = inject(Router);
  const keycloak = inject(Keycloak);
  const { authenticated, grantedRoles } = authData;

  if (!authenticated) {
    await keycloak.login({
      redirectUri: window.location.origin + state.url,
    });
    return false;
  }

  const userRoles = Object.values(grantedRoles.resourceRoles).flat();
  const url = state.url;
  const params = route.params;
  const hasRole = (role: string) => userRoles.includes(role);
  if (url === '/institute-list') return hasRole('institute_read');
  if (url === '/institute-create' || url === `/institute-edit/${params['id']}`)
    return hasRole('institute_write');
  if (url === '/campus')
    return hasRole('campus_read')
      || hasRole('campus_write')
      || hasRole('campus_delete');
  if (url === '/faculty-type')
    return hasRole('faculty_type_read')
      || hasRole('faculty_type_write')
      || hasRole('faculty_type_delete');
  if (url === '/faculty-list') return hasRole('faculty_read');
  if (url === '/faculty-create' || url === `/faculty-edit/${params['id']}`)
    return hasRole('faculty_write');
  if (url === '/department-type')
    return hasRole('department_type_read')
      || hasRole('department_type_write')
      || hasRole('department_type_delete');
  if (url === '/department-list') return hasRole('department_read');
  if (url === '/department-create' || url === `/department-edit/${params['id']}`)
    return hasRole('department_write');
  if (url === '/program-type') return hasRole('program_type_read');
  if (url === '/semester-type') return hasRole('semester_type_read');
  if (url === '/program-list') return hasRole('program_read');
  if (url === '/semester-list') return hasRole('semester_read');
  if (url === '/semester-create' || url === `/semester-edit/${params['id']}`)
    return hasRole('semester_write');
  if (url === '/course-type') return hasRole('course_type_read');

  const requiredRoles = route.data['roles'];
  if (!requiredRoles) {
    return false;
  }

  const hasRequiredRole = (role: string): boolean =>
    userRoles.some((roles) => roles.includes(role));
  if (authenticated && hasRequiredRole(requiredRoles)) {
    return true;
  }

  return router.parseUrl('/login');
}
export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
