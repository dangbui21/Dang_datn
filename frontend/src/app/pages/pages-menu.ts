import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'E-commerce',
  //   icon: 'shopping-cart-outline',
  //   link: '/pages/dashboard',
  //   home: true,
  // },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'home-outline',
  //   link: '/pages/iot-dashboard',
  // },
  
  // {
  //   title: 'Miscellaneous',
  //   icon: 'shuffle-2-outline',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // },
  
  {
    title: 'Thị trường',
    icon: 'trending-up-outline', 
    link: '/pages/stock-market',
  },
  {
    title: 'Biểu đồ kỹ thuật',
    icon: 'bar-chart-outline', 
    link: '/pages/technical-charts',
  },
  {
    title: 'Biểu đồ tùy chỉnh',
    icon: 'settings-outline',
    link: '/pages/custom-charts',
  },
  {
    title: 'Trang của tôi',
    icon: 'person-outline', // hoặc 'home-outline'
    link: '/pages/my-page',
  },
  {
    title: 'Tài khoản',
    icon: 'person-outline',
    children: [
      {
        title: 'Đăng nhập',
        link: '/pages/acc/login',
        hidden: !!localStorage.getItem('user'),
      },
      {
        title: 'Đăng ký',
        link: '/pages/acc/register',
        hidden: !!localStorage.getItem('user'),
      },
      {
        title: 'Đổi mật khẩu',
        link: '/pages/acc/change-password',
      },
    ],
  },
];
