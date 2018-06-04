<template lang="html">
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
    	<div class="overview">
    		<div class="overview-left border-1px-right">
    			<h1 class="score">{{seller.score}}</h1>
    			<div class="title">综合评分</div>
    			<div class="rank">高于周边商家{{seller.rankRate}}%</div>
    		</div>
    		<div class="overview-right">
    			<div class="score-warp">
    				<div class="title">服务态度</div>
    				<star :size="36" :score="seller.serviceScore"></star>
    				<span class="score">{{seller.serviceScore}}</span>
    			</div>
    			<div class="score-warp">
    				<div class="title">商品评分</div>
    				<star :size="36" :score="seller.foodScore"></star>
    				<span class="score">{{seller.foodScore}}</span>
    			</div>
    			<div class="delivery-warp">
    				<span class="title">送达时间</span>
    				<span class="delivery">{{seller.deliveryTime}}分钟</span>
    			</div>
    		</div>
    	</div>
			<split></split>
			<RatingSelect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent" @only-content="onlyContentFun" @select-type="selectTypeFun"></RatingSelect>
			<div class="ratings-warp">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.text,rating.rateType)" class="rating-item border-1px">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-warp">
								<star :size="24" :score="rating.score"></star>
								<span v-show="rating.deliveryTime" class="delivery">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<div class="text" v-show="rating.text">{{rating.text}}</div>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="icon-thumb_up recommend-first"></span>
								<span class="recommend-item border-all" v-for="item in rating.recommend">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | conversionDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '@/components/star/star'
import split from '@/components/split/split'
import RatingSelect from '@/components/ratingSelect/ratingSelect' //评论筛选
import BScroll from 'better-scroll';  //滑动插件
import {conversionDate} from 'common/js/date'
const ERROK =0;
const ALL =2;

export default {
	props: {
		seller:{
			type:Object
		}
	},
	data() {
		return {
			ratings:[],
			showFlag:false,
			selectType:ALL,
			onlyContent:true
		}
	},
	created() {
		let that=this;
    this.$axios.get('/api/ratings').then((res) => {
      if(res.data.errno===ERROK){
        this.ratings=res.data.data;
        this.$nextTick(()=> {
        	this.scroll=new BScroll(this.$refs.ratings,{
	        	click:true
	        })
        })
        
      }
    })
	},
	filters: {
		conversionDate(time) {
			return conversionDate(time)
		}
	},
	methods: {
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
	components: {
		star,
		split,
		RatingSelect
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.ratings
		position absolute
		top 174px
		bottom 0px
		left 0px
		width 100%
		overflow hidden
		.ratings-content
			.overview
				display flex
				padding 18px 0
				.overview-left 
					padding-top 6px
					flex 0 0 137px
					width 137px
					border-1px-right(rgba(7, 17, 27, .1))
					text-align center
					@media only screen and (max-width 320px)
						flex 0 0 120px
						width 120px
					.score
						margin-bottom 6px
						line-height 28px
						font-size 24px
						color rgb(255, 153, 0)
					.title
						margin-bottom 8px
						line-height 12px
						font-size 12px	
						color rgb(7, 17, 27)
					.rank	
						line-height 10px
						font-size 10px	
						color rgb(147, 153, 159)
				.overview-right
					flex 1	
					padding 6px 0 6px 24px
					@media only screen and (max-width 320px)
						padding-left 6px
					.score-warp
						margin-bottom 8px
						font-size 0
						.title
							line-height 18px
							display inline-block
							vertical-align top
							font-size 12px
							color rgb(7, 17, 27)
						.star
							display inline-block	
							margin 0 12px
							vertical-align top
						.score
							line-height 18px
							display inline-block
							vertical-align top
							font-size 12px
							color rgb(255, 153, 0)
					.delivery-warp
						font-size 0	
						.title
							line-height 18px
							font-size 12px
							color rgb(7, 17, 27)
						.delivery
							margin-left 12px
							font-size 12px
							color rgb(147, 153, 159)	
			.ratings-warp
				padding 0 18px
				.rating-item
					padding 18px 0
					display flex
					border-1px(rgba(7, 17, 27,.1))		
					.avatar
						flex 0 0 28px
						width 28px
						margin-right 12px
						img	
							border-radius 50%	
					.content
						position relative
						flex 1
						.name
							margin-bottom 4px
							line-height 12px
							font-size 10px
							color rgb(7, 17, 27)
						.star-warp
							margin-bottom 6px
							font-size 0
							.star	
								margin-right 6px
								display inline-block
								vertical-align top	
							.delivery	
								display inline-block
								vertical-align top
								line-height 10px
								font-size 10px	
								color rgb(147, 153, 159)
						.text	
							line-height 18px
							margin-bottom 8px
							font-size 12px;	
							color rgb(7, 17, 27)
						.recommend	
							font-size 0px
							.recommend-first,.recommend-item
								line-height 16px
								display inline-block
								margin 0 8px 4px 0
								overflow hidden
								text-overflow ellipsis
								white-space nowrap
								text-align center
								vertical-align top
							.recommend-first	
								padding-top 4px
								font-size 12px
								color rgb(0, 160, 220)
							.recommend-item
								width 52px
								padding 3px
								margin 0 8px 4px 0
								font-size 9px
								color rgb(147, 153, 159)
								border-all(rgba(7, 17, 27,.1))	
								border-radius 1px
						.time
							position absolute
							top 0
							right 0px
							color rgb(147, 153, 159)
							font-size 10px
</style>
