import { adminRouters } from './admin';
import { questRouters } from './question';
import { userRouters } from './user';

export const routerHandlers = [
  adminRouters,
  questRouters,
  userRouters
];