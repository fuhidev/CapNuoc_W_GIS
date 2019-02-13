import QLSCPage from '../pages/QLSCPage';
import QuanLyMangLuoiPage from '../pages/QuanLyMangLuoiPage';
import TNSCPage from '../pages/TNSCPage';

export interface Route {
  id: string; name: string; component: any;
  props: { math?: boolean, exact?: boolean, path: string };
  avatar: string;
}

const routes: Array<Route> = [
  {
    id: 'qlml', name: 'Quản lý mạng lưới', component: QuanLyMangLuoiPage,
    props: { exact: true, path: '/qlhtkt' },
    avatar: '/images/icons/qlhtkt.png'
  },
  {
    id: 'qlsc', name: 'Quản lý sự cố', component: QLSCPage,
    props: { path: '/qlsc' },
    avatar: '/images/icons/qlsc.png'
  },
  {
    id: 'tnsc', name: 'Tiếp nhận sự cố', component: TNSCPage,
    props: { path: '/tnsc' },
    avatar: '/images/icons/tnsc.png'
  },
];
export default routes;