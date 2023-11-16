import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Admin'
  },

  {
    name: 'Account Admin',
    url: '/admin/read-admin',
    iconComponent: { name: 'cilHome' },
  },
  {
    name: 'Category',
    url: '/category/read-category',
    iconComponent: { name: 'cilTags'},
  },
  {
    name: 'Product',
    url: '/product/read-product',
    iconComponent: { name: 'cilStar' },
  },
  {
    name: 'Customer',
    url: '/customer/read-customer',
    iconComponent: { name: 'cilCursor' },
  },
];
