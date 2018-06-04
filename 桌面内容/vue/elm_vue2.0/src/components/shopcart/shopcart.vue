<template lang="html">
	<div id="cartWarp">
	  <div class="shopcart">
	    <div class="content" @click="toggleList">
	      <div class="content-left">
	        <div class="logo-warp">
	          <div class="logo" :class="{'heightlight':totalCont>0}">
	            <i class="icon-shopping_cart" :class="{'heightlight':totalCont>0}"></i>
	          </div>
	          <div class="num" v-show="totalCont>0" v-html="totalCont"></div>
	        </div>
	        <div class="price" v-html="'¥'+totalPrice+'元'" :class="{'heightlight':totalPrice>0}"></div>
	        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
	      </div>
	      <div class="content-right" @click.stop.prevent="pay">
	        <div class="pay" v-html="payDesc" :class="payClass"></div>
	      </div>
	    </div>
	    <div class="ball-container">
	    	<div v-for="(ball,index) in balls" :key="index">
	    		<transition name="drop" 
			    		@before-enter="beforeEnter" 
			    		@enter="enter" 
			    		@after-enter="afterEnter">
			  		<div v-show="ball.show" class="ball">
			  			<div class="inner inner-hook"></div>
			  		</div>
			  	</transition>
	    	</div>	
		  </div>
		  <transition name="fold">
			  <div class="shopcart-list" v-show="listshow">
			  	<div class="list-header">
			  		<div class="title">购物车</div>
			  		<div class="empty" @click="empty">清空</div>
			  	</div>	
		  		<div class="list-content" ref="listContent">
		  			<ul>
		  				<li v-for="food in selectFoods" class="food border-1px">
		  					<span class="name" v-html="food.name"></span>
		  					<div class="price">
		  						<span v-html="'¥'+food.price*food.count"></span>
		  					</div>
		  					<div class="cartcontrol-wrap">
		  						<cartcontrol :food="food"></cartcontrol>
		  					</div>
		  				</li>
		  			</ul>
		  		</div> 
			  </div>
		  </transition>
	  </div>
	  <transition name="fade">
			<div class="list-mask" v-show="listshow"></div>
		</transition>
	</div>
</template>
<script type="text/ecmascript-6">
import {mapState,mapMutations} from 'vuex';
import Bus from '@/bus/index';
import cartcontrol from '@/components/cartcontrol/cartcontrol.vue';  //购物车加减
import BScroll from 'better-scroll';  //滑动插件
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
  	return {
  		balls:[
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				}
  		],
  		dropBalls:[],
  		fold:true	
  	}
  },
  computed: {
    totalPrice() {
    	//计算价格
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.count * food.price;
      })
      return total;
    },
    totalCont() {
    	//计算订单数量
      let cont = 0;
      this.selectFoods.forEach((food) => {
        cont += food.count;
      })
      return cont;
    },
    payDesc() {
    	//计算起送费用
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差¥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
    	//计算减号显示
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listshow() {
    	if(!this.totalCont){
    		this.fold=true;
    		return false
    	}

    	let show =!this.fold;
    	if(show){
    		this.$nextTick(() => {
    			if(!this.scroll){
    				this.scroll=new BScroll(this.$refs.listContent,{
	    				click:true
	    			})
    			}else{
						this.scroll.refresh();
    			}
    		})
    	}
    	return show;
    }
  },
  created() {
  	//vuex 提取公共数据
		//this.$store.commit('balls',this.balls);
  },
	mounted() {
		//体验优化异步执行小球下落
		this.$nextTick(()=>{
			this.ball();
		})
	},
	methods:{	
		ball(event) {
			let that=this;
			//获取兄弟组件的方法处理本组件数据
			Bus.$on('addBall',(el)=>{
				for (var i = 0;that.balls.length >i;  i++) {
					let ball=that.balls[i];
					if(!ball.show){
						ball.show=true;
						ball.el=el;
						that.dropBalls.push(ball);
						return;
					}
				}
			})
		},
		beforeEnter(el) {
			let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
        	//获取元素相对于视窗的位置集合
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
          inner.style.transition = 'all 0.4s';
        }
      }
		},
		enter(el) {
			/* eslint-disable no-unused-vars */
			let rf =el.offsetHeight;
			this.$nextTick(()=>{
				el.style.webkitTransform='translate3d(0,0,0)';
				el.style.transform='translate3d(0,0,0)';
				let inner =el.getElementsByClassName('inner-hook')[0];
				inner.style.webkitTransform='translate3d(0,0,0)';
				inner.style.transform='translate3d(0,0,0)';
				inner.style.transition = 'all 0.4s';
			})
		},
		afterEnter(el) {
			let ball=this.dropBalls.shift();
			if (ball) {
				ball.show=false;
				el.style.display='none';
			}
		},
		toggleList() {
			if (!this.totalCont) {
				return
			}
			this.fold=!this.fold;
		},
		empty() {
			this.selectFoods.forEach((food) => {
				food.count=0
			})
		},
		pay() {
			if (this.totalPrice<this.minPrice) {
				return
			}
			alert(`支付${this.totalPrice}元`)
		}
	},
	components:{
		cartcontrol
	}
}

</script>


<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl";
	@import "../../common/stylus/base.styl";
	.shopcart
		position fixed
		left 0px
		bottom 0px
		z-index 50
		width 100%
		height 48px
		.content
			display flex
			background-color #141d27
			font-size 0
			color rgba(255, 255, 255, .4)
			.content-left
				flex 1
				.logo-warp
					display inline-block
					position relative
					top -10px
					margin 0 12px
					padding 6px
					width 56px
					height 56px
					box-sizing border-box
					vertical-align top
					border-radius 50%
					background-color #141d27
					.logo
						width 100%
						height 100%
						border-radius 50%
						background-color #2b343c
						text-align center
						&.heightlight
							background-color rgb(0, 160, 220)
						.icon-shopping_cart
							line-height 44px
							font-size 24px
							color #80858a
							&.heightlight
								color #fff
					.num
						position absolute
						top 0px
						right 0px
						width 24px
						height 16px
						line-height 16px
						text-align center
						border-radius 16px
						font-size 9px
						font-weight 700
						color #fff
						background-color rgb(240, 20, 20)
						box-shadow 0 4 8px 0 rgba(0, 0, 0, .4)
				.price
					display inline-block
					vertical-align top
					margin-top 12px
					line-height 24px
					padding-right 12px
					box-sizing border-box
					border-right 1px solid rgba(255, 255, 255, .1)
					font-size 16px
					font-weight 700
					&.heightlight
						color #fff
				.desc		
					display inline-block
					font-size 12px
					line-height 24px
					margin 12px 0 9px 12px
			.content-right
				flex 0 0 105px
				width 105px	
				.pay
					height 48px
					line-height 48px
					text-align center
					font-size 12px
					font-weight 700
					&.not-enough
						background-color #2b333b
					&.enough
						background-color #00b43c
						color #fff	
		.ball-container
			.ball
				position fixed
				left 32px
				bottom 22px
				z-index 200
				&.drop-enter-active
					transition all 0.4s cubic-bezier(.59,-0.05,.6,.34)
					.inner
						width 16px
						height 16px
						border-radius 50%
						background rgb(0,160,220) 
						transition all 0.4s linear
		.shopcart-list
			position absolute
			top 0px
			left 0px
			z-index -1	
			width 100%
			transform translate3d(0,-100%,0)
			&.fold-enter-active, &.fold-leave-active
				transition all .5s
			&.fold-enter, &.fold-leave-to
				transform translate3d(0,0,0)
			.list-header
				height 40px
				line-height 40px
				padding 0 18px
				background-color #f3f5f7
				border-bottom solid 1px rgba(7, 17, 27, .1)
				.title
					float left
					font-size 14px
					color rgb(7, 17, 27)
				.empty	
					float right
					font-size 12px
					color rgb(0, 160, 220)
			.list-content
				padding 0 18px
				max-height 217px
				overflow hidden
				background-color #fff
				.food
					position relative
					padding 12px 0
					box-sizing border-box
					border-1px(rgba(7, 17, 27, .1))
					.name	
						line-height 24px
						font-size 14px
						color rgb(7, 17, 27)
					.price
						position absolute
						right 90px
						bottom 12px
						line-height 24px
						font-size 14px
						font-weight 700	
						color rgb(240, 20, 20)
					.cartcontrol-wrap
						position absolute
						right 0px
						bottom 6px	
						
	.list-mask
		width 100%
		height 100%
		position fixed
		top 0px
		left 0px
		z-index 40
		background-color rgba(7, 17, 27, .6)
		backdrop-filter blur(10px)
		transition all .5s
		&.fade-enter-active, &.fade-leave-active 
			background-color rgba(7, 17, 27, .6)   
		&.fade-enter, &.fade-leave-to
			background-color rgba(7, 17, 27, 0)				
</style>
