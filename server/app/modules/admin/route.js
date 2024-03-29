import {
  GetUser, CreateUser, LoginUser, UpdateUser, DeleteUser, CreateAdmin, hasUsers, CreateAdminBySuper, ChangePassword
} from './controller';
import { isAuthenticated } from '../../middlewares';
import { validateAdmin } from './validate';
import { fileUploadMiddlware } from '../../middlewares/file';
// import { isAuthenticated } from '@mid'

export const routers = {
  baseUrl: '/api/admin',
  routes: [
    {
      method: 'GET',
      route: '/',
      handlers: [
        GetUser
      ]
    },
    {
      method: 'GET',
      route: '/has-users',
      handlers: [
        hasUsers
      ]
    },
    {
      method: 'POST',
      route: '/login',
      handlers: [
        LoginUser
      ]
    },
    {
      method: 'POST',
      route: '/register',
      handlers: [
        CreateUser
      ]
    },
    {
      method: 'POST',
      route: '/create-admin',
      handlers: [
        validateAdmin,
        CreateAdmin
      ]
    },
    {
      method: 'POST',
      route: '/create-admin-by-super',
      handlers: [
        isAuthenticated,
        validateAdmin,
        CreateAdminBySuper
      ]
    },
    {
      method: 'PUT',
      route: '/',
      handlers: [
        isAuthenticated,
        fileUploadMiddlware,
        UpdateUser
      ]
    },
    {
      method: 'PUT',
      route: '/change-password',
      handlers: [
        isAuthenticated,
        ChangePassword
      ]
    },
    {
      method: 'DELETE',
      route: '/',
      handlers: [
        isAuthenticated,
        DeleteUser
      ]
    }
  ]
};
