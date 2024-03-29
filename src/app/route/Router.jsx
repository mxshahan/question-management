import { SignIn, SignUp } from "../components/views/auth";
import { Dashboard, NotFound } from "../components/views";
import { HubSidebar } from "../data";
import Admin from '../components/views/admin/AdminProfile';
let baseUrl = '';
let HubRoute = []

// Authorized Sidebar and Routes Informations - Admin
HubSidebar.map((item) => {
  if (item.to) baseUrl = item.to;
  if (!item.component && !item.content) {
    return { component: NotFound }
  }
  if (item.content) {
    item.content.map((submenu) => {
      return submenu.component && HubRoute.push({
        path: baseUrl + submenu.to,
        exact: true,
        component: submenu.component
      })
    })
  } else {
    return HubRoute.push({ path: item.to, exact: true, component: item.component })
  }
  return HubRoute;
})


// Login or Sign in Routes
export const Auth = [
  { path: '/signin', exact: true, component: SignIn },
  { path: '/create-admin', exact: true, component: SignUp }
  // { path: '/signup', exact: true, component: SignUp },
]

// Public Routes
export const Public = [

]

// Public Routes
export const Private = [
  { path: '/', exact: true, component: Dashboard },
  { path: '/profile', exact: true, component: Admin},
  ...HubRoute,
]