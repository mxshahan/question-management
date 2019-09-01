import {
  CreateUser, GetUsers, DeleteUser, UpdateUser, DeleteMultipe
} from './controller';
import { isAuthenticated } from '@mid';

export const routers = {
  baseUrl: '/api/user',
  routes: [
    {
      method: 'GET',
      route: '/',
      handlers: [
        GetUsers
      ]
    },
    {
      method: 'POST',
      route: '/create-user',
      handlers: [
        isAuthenticated,
        CreateUser
      ]
    },
    {
      method: 'POST',
      route: '/delete-multiple',
      handlers: [
        isAuthenticated,
        DeleteMultipe
      ]
    },
    {
      method: 'DELETE',
      route: '/:id',
      handlers: [
        isAuthenticated,
        DeleteUser
      ]
    },
    {
      method: 'PUT',
      route: '/:id',
      handlers: [
        isAuthenticated,
        UpdateUser
      ]
    },
  ]
};
