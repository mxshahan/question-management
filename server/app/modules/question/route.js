import {
  CreateQuestion, getQuestion, updateQuestion, deleteQuestion, readCSV, updateStatus, getOneQuestion, deleteMultiple
} from './controller';
import { isAuthenticated } from '@mid';

export const routers = {
  baseUrl: '/api/question',
  routes: [
    {
      method: 'POST',
      route: '/create-question',
      handlers: [
        isAuthenticated,
        CreateQuestion
      ]
    },
    {
      method: 'GET',
      route: '/get-question',
      handlers: [
        isAuthenticated,
        getQuestion
      ]
    },
    {
      method: 'GET',
      route: '/:id',
      handlers: [
        isAuthenticated,
        getOneQuestion
      ]
    },
    {
      method: 'POST',
      route: '/upload-file',
      handlers: [
        isAuthenticated,
        readCSV
      ]
    },
    {
      method: 'PUT',
      route: '/update-status/:id',
      handlers: [
        isAuthenticated,
        updateStatus
      ]
    },
    {
      method: 'PUT',
      route: '/:id',
      handlers: [
        isAuthenticated,
        updateQuestion
      ]
    },
    {
      method: 'DELETE',
      route: '/:id',
      handlers: [
        isAuthenticated,
        deleteQuestion
      ]
    },
    {
      method: 'POST',
      route: '/',
      handlers: [
        isAuthenticated,
        deleteMultiple
      ]
    },

  ]
};
