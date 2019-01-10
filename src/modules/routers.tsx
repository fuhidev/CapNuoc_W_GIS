import QuanLyMangLuoiPage from '../pages/QuanLyMangLuoiPage';
import QuanLySuCoPage from '../pages/QuanLySuCoPage';
import QuanLyTonThatDMAPage from '../pages/QuanLyTonThatDMAPage';
import QuanLySanLuongKHPage from '../pages/QuanLySanLuongKHPage';
import TiepNhanSuCoPage from '../pages/TiepNhanSuCoPage';

export interface Route {
  id: string; name: string; component: any;
  props: { math?: boolean, exact?: boolean, path: string };
}

const routes: Array<Route> = [
  {
    id: 'qlml', name: 'Quản lý mạng lưới', component: QuanLyMangLuoiPage,
    props: { math: true, exact: true, path: '/' }
  },
  { id: 'qlsc', props: { path: '/qlsc' }, name: 'Quản lý sự cố', component: QuanLySuCoPage },
  { id: 'qltt', props: { path: '/qltt' }, name: 'Quản lý tổn thất DMA', component: QuanLyTonThatDMAPage },
  { id: 'ttslkh', props: { path: '/ttslkh' }, name: 'Quản lý SLKH', component: QuanLySanLuongKHPage },
  { id: 'tnsc', props: { path: '/tnsc' }, name: 'Tiếp nhận sự cố', component: TiepNhanSuCoPage },
];
export default routes;