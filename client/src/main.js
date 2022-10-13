import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'
import store from './store'

//부트스트랩 정의
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(router).mixin(mixins).use(store).mount('#app')

window.Kakao.init("3bd2dd0b08a9bbb7e35509fe14c11d14");  //자바스크립트 키

