import {
  CreateUser, GetUsers, DeleteUser, UpdateUser, DeleteMultipe, UploadProfileImage
} from './controller';
import { isAuthenticated } from '@mid';
import { fileUploadMiddlware } from '../../middlewares/file';

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
      method: 'POST',
      route: '/upload-image/:id',
      handlers: [
        isAuthenticated,
        fileUploadMiddlware,
        UploadProfileImage
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
