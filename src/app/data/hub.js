import {
  Dashboard,
  Basic,
  Deep,
  AddQuestion,
  BulkUpload,
  EditQuestion,
  UsersActive
} from "../components/views";

export const HubRoot = {
  dashboard: "/",
  organizations: "/organizations",
  users: "/users",
  ques: "/question",
}

export const HubSidebar = [
  {
    icon: 'mdi-view-dashboard',
    label: 'Dashboard',
    to: HubRoot.dashboard,
    exact: true,
    component: Dashboard
  },
  {

    icon: 'mdi-account-multiple',
    label: 'Users Management',
    to: HubRoot.users,
    content: [
      {
        label: 'Active Users',
        to: '/active-users',
        component: UsersActive
      },
      {
        label: 'Blocked Users',
        to: '/blocked-users',
      },
      {
        label: 'Deactivated Users',
        to: '/deactivated-users',
      },
    ]
  },
  {
    icon: 'mdi-help-circle',
    label: 'Question Management',
    to: HubRoot.ques,
    content: [
      {
        label: 'Basic',
        to: '/basic',
        component: Basic
      },
      {
        label: 'Deep',
        to: '/deep',
        component: Deep
      },
      {
        label: 'Add Question',
        to: '/add-question',
        component: AddQuestion
      },
      {
        label: 'Bulk Upload',
        to: '/bulk-upload',
        component: BulkUpload
      },
      {
        label: 'Edit',
        to: '/edit-question/:id',
        component: EditQuestion,
        isHide: true
      },
    ],
  },
]