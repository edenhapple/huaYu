<template lang="html">
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="img-header">
					<img :src="food.image" alt="">
					<div class="back">
						<i class="icon-arrow_lift" @click="back"></i>
					</div>
				</div>
				<div class="content">
					<div class="title" v-html="food.name"></div>
					<div class="detail">
						<div class="sell-count">月售{{food.sellCount}}</div>
						<div class="rating">好评率{{food.rating}}%</div>
					</div>
					<div class="price">
						<span class="now" v-html="'¥'+food.price"></span>
    				<span class="old" v-show="food.oldPrice" v-html="'¥'+food.oldPrice"></span>
					</div>
					<div class="cartcontrol-warp">
						<cartcontrol :food="food" ref="cartcontrolAdd"></cartcontrol>
					</div>
					<transition name="fade">
						<div class="buy" v-show="!food.count||food.count===0" @click="addFirst">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品详情</h1>
					<div class="text" v-html="food.info"></div>
				</div>
				<split></split>
				<div class="rating">
					<div class="title">评价详情</div>
					<RatingSelect ref="rateSelect" :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" @only-content="onlyContentFun" @select-type="selectTypeFun"></RatingSelect>
					<ul v-show="food.ratings && food.ratings.length" class="rating-list" >
						<li class="list border-1px" v-for="rating in food.ratings" v-show="needShow(rating.text,rating.rateType)">
							<div class="rating-time">{{rating.rateTime | conversionDate}}</div>
							<div class="rating-info">
								<i :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'"></i>
								<div class="rating-text">{{rating.text}}</div>
							</div>
							<div class="users">
								<span class="name">{{rating.username}}</span>
								<img class="avatar" :src="rating.avatar" alt="">
							</div>
						</li>
					</ul>
					<div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂无评论	</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
import cartcontrol from '@/components/cartcontrol/cartcontrol';  //购物车加减
import split from '@/components/split/split'; //分割线
import RatingSelect from '@/components/ratingSelect/ratingSelect'; //评论筛选
import BScroll from 'better-scroll';  //滑动插件
import {conversionDate} from 'common/js/date';  //时间戳格式转换 yyyy-MM-dd hh:mm:ss
// const POSITIVE =0;
// const NEGTIVE =1;
const ALL =2;

export default {
	props: {
		food:{
			type:Object
		}
	},
	data() {
		return {
			showFlag:false,
			selectType:ALL,
			onlyContent:false,
			desc: {
				all:'全部',
				positive:'推荐',
				negtive:'吐槽'
			}
		}
	},
	mounted() {

	},
	watch: {
		food(rating) {
			//监听food数据，变化时执行回调	
		}
	},
	methods: {
		show() {
			this.showFlag=true;
			//初始化默认显示的评价列表
			this.selectType=ALL;
			this.onlyContent=true
			//异步更新滑动插件位置
			this.$nextTick(()=> {
				if (!this.scroll) {
					this.scroll=new BScroll(this.$refs.food,{
						click:true
					})
				}
			})
		},
		back() {
			this.showFlag=false
		},
		//调取cartcontrol组件方法
		addFirst(event) {
			this.$refs.cartcontrolAdd.addCart(event)
		},
		//ratingSelect组件调用并赋值
		onlyContentFun(data) {
			this.onlyContent=data; 
			//异步更新滑动插件位置
			this.$nextTick(()=> {
				this.scroll.refresh();
			})
		},
		//ratingSelect组件调用并赋值
		selectTypeFun(data) {
			this.selectType=data;
			this.$nextTick(()=> {
				this.scroll.refresh();
			})
		},
		//点击评价按钮，计算评价列表显示
		needShow(text,type) {
			if (this.onlyContent && !text) {
				return false
			}
			if (this.selectType===ALL) {
				return true
			}else{
				return this.selectType === type
			}
		}
	},
	filters: {
		conversionDate(time) {
			return conversionDate(time)
		}
	},
	components:{
		cartcontrol,
		split,
		RatingSelect
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.food
		position fixed
		top 0px
		left 0px
		bottom 48px
		width 100%
		height 100%
		background-color #fff
		z-index 30
		transition all .2s linear
		transform translate3d(0,0,0)
		&.move-enter-active
			transform translate3d(0,0,0)
		&.move-enter,&.move-leave-active
			transform translate3d(100%,0,0)
		.food-content
			.img-header
				position relative
				width 100%
				height 0
				padding-top 100%
				img
					position absolute
					top 0px
					left 0px
					width 100%
					height 100%
				.back	
					position absolute
					top 10px
					left 0px
					.icon-arrow_lift
						display block
						padding 10px
						font-size 20px
						color #fff
						text-shadow: 0px 1px 2px #ccc;
			.content
				padding 18px
				position relative
				.title
					line-height 14px
					margin-bottom 8px
					font-size 14px
					font-weight 700
					color rgb(7,17,27)
				.detail
					margin-bottom 18px
					line-height 10px
					height 10px
					font-size 0
					.sell-count,.rating
						font-size 10px
						display inline-block
						color rgb(147, 153, 159)
					.sell-count
						margin-right 12px		
				.price
					font-weight 700
					line-height 24px
					.now	
						margin-right 8px
						font-size 14px
						color rgb(240, 20, 20)
					.old
						text-decoration line-through
						font-size 10px
						color rgb(147, 153, 159)		
						
				.cartcontrol-warp
					position absolute
					right 12px
					bottom 12px
				.buy
					position absolute
					right 18px
					bottom 18px
					z-index 10
					line-height 24px
					height 24px
					padding 0 12px
					box-sizing border-box
					font-size 10px
					border-radius 12px
					background-color rgb(0, 160, 220)
					color #fff
					transition all .4s
					&.fade-enter-active, &.fade-leave-active 
						background-color rgba(0, 160, 220, 1)   
					&.fade-enter, &.fade-leave-to
						background-color rgba(0, 160, 220, 0)	
						opacity 0
			.info	
				padding 18px
				.title	
					font-size 14px
					margin-bottom 6px
					line-height 14px
					color rgb(7, 17, 27)	
				.text	
					line-height 24px
					font-size 12px
					padding 0 8px
					color rgb(77, 85, 93)
			.rating	
				padding-top 18px
				padding-bottom 100px
				.title	
					font-size 14px
					margin-left 18px
					line-height 14px
					color rgb(7, 17, 27)	
				.rating-list
					padding 0 18px
					.list
						position relative
						padding 16px 0
						font-size 0
						color rgb(147, 153, 159)
						border-1px(rgba(7, 17, 27, .1))
						.rating-time
							font-size 10px
							line-height 12px
						.rating-info	
							margin-top 6px
							font-size 12px
							.icon-thumb_down,.icon-thumb_up
								line-height 16px
								vertical-align top
								display inline-block
								&.icon-thumb_up
									color rgb(0, 160, 220)
							.rating-text	
								display inline-block
								vertical-align top
								color rgb(7, 17, 27)	
								line-height 16px	
						.users	
							position absolute
							top 16px
							right 0px
							font-size 10px		
							.name	
								line-height 12px
								font-size 10px	
							.avatar	
								width 12px
								height 12px
								margin-left 6px
								border-radius 50%
								display inline-block
								vertical-align top
				.no-ratings
					padding 18px
					font-size 12px
					color #93999f
</style>
