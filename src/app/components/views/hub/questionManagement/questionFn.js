export const formatStatus = (status) => {
  switch (status) {
    case 'active':
      return 'Activated';
    case 'deactive':
      return 'Deactivated';
    default:
      return '';
  }
}