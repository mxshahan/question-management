import { SignIn, SignUp } from "../components/views/auth";
import { Dashboard, Basic, Deep, AddQuestion, BulkUpload } from "../components/views";
import EditQuestion from "../components/views/hub/questionManagement/EditQuestion";

// Authorized Sidebar and Routes Informations - Admin
// PubSidebar.map((item) => {
//   if (item.to) baseUrl = item.to;
//   if (!item.component && !item.content) {
//     return { component: NotFound }
//   }
//   if (item.content) {
//     item.content.map((submenu) => {
//       return submenu.component && PubRoute.push({
//         path: baseUrl + submenu.to,
//         exact: true,
//         component: submenu.component
//       })
//     })
//   } else {
//     return PubRoute.push({ path: item.to, exact: true, component: item.component })
//   }
//   return PubRoute;
// })


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
  { path: '/ques/basic', exact: true, component: Basic },
  { path: '/ques/deep', exact: true, component: Deep },
  { path: '/ques/add-question', exact: true, component: AddQuestion },
  { path: '/ques/bulk-upload', exact: true, component: BulkUpload },
  { path: '/ques/edit-question/:id', exact: true, component: EditQuestion, name: "Edit Question" },
]