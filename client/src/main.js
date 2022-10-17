import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'
import store from './store'

//뷰스윗알럿
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

//부트스트랩 정의
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(router).mixin(mixins).use(store).use(VueSweetalert2).mount('#app');
window.Kakao.init("3bd2dd0b08a9bbb7e35509fe14c11d14");  //자바스크립트 키

