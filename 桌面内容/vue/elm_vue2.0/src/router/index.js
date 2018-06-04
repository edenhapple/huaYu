// 使用`import`命令加载Vue构建版本
// (runtime-only or standalone) 已在webpack.base.conf中使用别名进行设置。
import Vue from 'vue';
import VueRouter from 'vue-router';
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'
Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.use(VueRouter);
const router=new VueRouter(
  {
    linkActiveClass:'active',
    routes:[
      {path: '/goods',name:'goods', component:Goods},
      {path: '/ratings',name:'ratings', component:Ratings},
      {path: '/seller',name:'seller', component:Seller}
    ]
  }
);

//router.push('/goods')
export default router;
