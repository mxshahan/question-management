import { Dashboard, Processes } from "../components/views";

export const HubRoot = {
  dashboard: "/",
  processes: "/processes",
  machine_info: "/machine-info",
  oparator_info: "/oparator-info",
  report: "/report",
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
    icon: 'mdi-autorenew',
    label: 'Processes',
    to: HubRoot.processes,
    component: Processes
  },
  {
    icon: 'mdi-wrench',
    label: 'Machine Info',
    to: HubRoot.machine_info,
    component: Processes
  },
  {
    icon: 'mdi-account-multiple',
    label: 'Oparator Info',
    to: HubRoot.oparator_info,
    component: Processes
  },
  {
    icon: 'mdi-marker',
    label: 'Report',
    to: HubRoot.report,
    component: Processes
  },
]