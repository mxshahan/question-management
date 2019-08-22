import { Dashboard } from "../components/views";

export const HubRoot = {
  dashboard: "/",
  organizations: "/organizations",
  users: "/user",
  ques: "/ques",
  articles: "/articles",
  journals: "/journals",
  article_approval: '/article-approval',
  article_decline: '/article-decline',
  role: '/role',
  orcid_id: '/orcid-id',
  oaDeal: '/oa-deal'
}

// All endpoints

// export const HubSidebar = [
//   {
//     icon: 'mdi-view-dashboard',
//     label: 'Dashboard',
//     to: HubRoot.dashboard,
//     exact: true,
//     component: Dashboard
//   },
//   {
//     icon: 'mdi-account-multiple',
//     label: 'Users',
//     to: HubRoot.users,
//     content: [
//       {
//         label: 'Add User',
//         to: '/add-user',
//         // component: AddUser,
//       },
//       {
//         label: 'User List',
//         to: '/user-list',
//         // component: UserList,
//       },
//       {
//         label: 'View User',
//         to: '/:id',
//         // component: ViewUser,
//         isHide: true,
//       },
//     ],
//   },
// ]

export const HubSidebar = [
  {
    icon: 'mdi-view-dashboard',
    label: 'Dashboard',
    to: HubRoot.dashboard,
    exact: true,
    component: Dashboard
  },
  {
    icon: 'mdi-help-circle',
    label: 'Question Management',
    to: HubRoot.ques,
    content: [
      {
        icon: 'circle-outline',
        label: 'Basic',
        to: '/basic',
      },
      {
        label: 'Deep',
        to: '/deep',
      },
      {
        label: 'Add Question',
        to: '/add-question',
      },
      {
        label: 'Bulk Upload',
        to: '/bulk-upload',
      },
      {
        label: 'Edit',
        to: '/edit-question',
        isHide: true
      },
    ],
  },
]