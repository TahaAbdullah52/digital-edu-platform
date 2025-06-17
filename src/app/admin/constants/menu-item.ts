export interface menu_item {
  id: string;
  label: string;
  icon: string;
}
export const CONST_MENU_ITEMS: menu_item[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'users', label: 'Manage Users', icon: 'people' },
    { id: 'payments', label: 'Payments', icon: 'payment' },
    { id: 'courses', label: 'Courses', icon: 'book' },
    { id: 'success-stories', label: 'Success Stories', icon: 'emoji_events' },
  ];