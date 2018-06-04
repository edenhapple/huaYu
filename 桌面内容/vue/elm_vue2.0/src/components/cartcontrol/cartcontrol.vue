<template lang="html">
	<div class="cart-control">
		<transition name="move">	
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
					<i class="inner icon-remove_circle_outline"></i>
			</div>
		</transition>	
		<div class="cart-count" v-show="food.count>0" v-html="food.count"></div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
	</div>
</template>

<script type="text/ecmascript-6">
import Bus from '../../bus/index.js';
export default {
	props: {
		food: {
			type:Object
		}
	},
	methods: {
		addCart(e) {
			if(!this.food.count){
				this.$set(this.food,'count',1);
			}else{
				this.food.count++
			}
			//vuex 提取公共数据
			// this.$store.commit('cartAddposition',e.target);
			// let type =this.$store.state.ball.balls;
			// let el = this.$store.state.ball.el;
			Bus.$emit('addBall',e.target);
		},
		decreaseCart() {
			this.food.count--
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cart-control
		font-size 0
		.cart-decrease
			display inline-block
			padding 6px
			&.move-enter-active
				opacity 1
				transition all .2s linear
				transform translate3d(0,0,0)
			  .inner
					display inline-block
					font-size 24px
					line-height 24px
					color rgb(0, 160, 220)	
					transition all 0.4s linear
					transform rotate(0)
			&.move-enter, &.move-leave-active
				opacity 0
				transition all .2s linear
				transform translate3d(24px,0,0)
				.inner
					transition all 0.4s linear
					transform rotate(180deg)
		.cart-count	
			display inline-block
			width 12px
			vertical-align top
			padding-top 6px
			line-height 24px
			text-align center
			font-size 10px
			color rgb(147, 153, 159)
		.cart-add
			display inline-block
			padding 6px
			font-size 24px
			line-height 24px
			color rgb(0, 160, 220)
</style>
