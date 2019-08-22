import {
  GetUser, CreateUser, LoginUser, UpdateUser, DeleteUser, CreateAdmin
} from './controller';
import { isAuthenticated } from '../../middlewares';
import { validateAdmin } from './validate';
// import { isAuthenticated } from '@mid'

export const routers = {
  baseUrl: '/api/user',
  routes: [
    {
      method: 'GET',
      route: '/',
      handlers: [
        GetUser
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
      method: 'PUT',
      route: '/',
      handlers: [
        isAuthenticated,
        UpdateUser
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
