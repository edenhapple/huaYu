<template lang="html">
  <div class="seller" ref="seller">
    <div class="seller-content">
    	<div class="overview">
    		<div class="title">{{seller.name}}</div>
    		<div class="desc border-1px">
    			<star :size="24" :score="seller.score"></star>
    			<span class="text">({{seller.ratingCount}})</span>
    			<span class="text">月售{{seller.sellCount}}单</span>
    		</div>
    		<ul class="remark">
    			<li class="block border-1px-right">
    				<h1>起送价</h1>
    				<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元					
    				</div>
    			</li>
    			<li class="block border-1px-right">
    				<h1>商家配送</h1>
    				<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元						
    				</div>
    			</li>
    			<li class="block">
    				<h1>平均配送时间</h1>
    				<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟						
    				</div>
    			</li>
    		</ul>
    		<div class="favorite" @click="toggleFavorite">
    			<span class="icon-favorite" :class="{'ican':favorite}"></span>
    			<span class="text">{{favoriteText}}</span>
    		</div>
    	</div>
    	<split></split>
    	<div class="bulletin">
    		<div class="title">公告与活动</div>
    		<div class="content-warp border-1px">
    			<div class="content">{{seller.bulletin}}</div>
    		</div>
    	</div>
  		<ul class="supports-warp">
  			<li class="support border-1px" v-for="support in seller.supports">
  				<supports :size="2" :suppertType="support.type"></supports>
  				<span class="text">{{support.description}}</span>
  			</li>
  		</ul>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<dev class="pic-warp" ref="picwarp">
					<ul class="pic-list" ref="piclist">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</dev>
			</div>
			<split></split>
			<div class="infos">
				<h1 class="title border-1px">商家信息</h1>
				<ul class="infos-warp">
					<li class="infos-item border-1px" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import {setStorage,getStorage} from 'common/js/storage';
	import star from '@/components/star/star'
	import split from '@/components/split/split'
	import supports from '@/components/supports/supports';
	import BScroll from 'better-scroll';  //滑动插件
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				favorite:getStorage(this.seller.id,'favorite',false)
			}
		},
		computed:{
			favoriteText() {
				return this.favorite ? '未收藏' : '未收藏'
			}
		},
		watch:{
			seller() {
				this._initScoll();
				this._picInitScoll();
			}
		},
		mounted() {
			this._initScoll();
			this._picInitScoll();
		},
		methods: {
			_initScoll() {
				this.$nextTick(()=> {
					if (!this.scroll) {
						this.scroll=new BScroll(this.$refs.seller, {
							click:true
						})
					}else{
						this.scroll.refresh()
					}
				});
			},
			_picInitScoll() {
				if (this.seller.pics) {
					let list =120;
					let margin =6;
					
					this.$nextTick(()=> {
						let width =(list + margin) * this.seller.pics.length - margin;
						this.$refs.piclist.style.width=width + 'px';
						if(!this.picScroll) {
							this.picScroll=new BScroll(this.$refs.picwarp, {
								scrollX:true,
								eventPassthrough: 'vertical'
							})
						}else{
							this.picScroll.refresh();
						}
					})
				}
			},
			toggleFavorite() {
				this.favorite=!this.favorite
				setStorage(this.seller.id,'favorite',this.favorite);
			}
		},
		components: {
			star,
			split,
			supports
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	.seller
		position absolute
		top 174px
		bottom 0px
		left 0px
		width 100%
		overflow hidden
		.overview
			padding 18px
			position relative
			.title
				line-height 16px
				margin-bottom 8px
				font-size 14px
				color rgb(7, 17, 27)
			.desc
				padding-bottom 18px
				font-size 0
				border-1px(rgba(7, 17, 27,.1))
				.star,.text
					line-height 18px
					display inline-block
					vertical-align top
					font-size 10px
				.star	
					margin-right 8px
				.text	
					margin-right 12px
					color rgb(77, 85, 93)
			.remark
				display flex
				.block	
					margin 18px 0 0 0
					flex 1
					text-align center	
					border-1px-right(rgba(7, 17, 27,.1))
					&:last-child
						border-none()
					h1
						margin-bottom 4px
						line-height 10px
						font-size 10px
						color rgb(147, 153, 159)
					.content
						line-height 10px
						font-size 10px
						color rgb(7, 17, 27)
						.stress
							line-height 24px
							font-size 24px
							font-weight 200
			.favorite	
				width 40px
				position absolute
				top 18px
				right 18px
				text-align center
				.icon-favorite
					margin-bottom 2px
					display block
					line-height 24px
					font-size 24px
					color #d4d6d9	
					&.ican	
						color rgb(240, 20, 20)
				.text	
					line-height 10px
					font-size 10px	
					color #93999f
		.bulletin
			padding 18px 18px 0 18px
			.title
				margin-bottom 8px
				line-height 14px
				color rgb(7, 17, 27)
				font-size 14px
			.content-warp
				padding 0 12px 16px 12px
				border-1px(rgba(7, 17, 27,.1)) 	
			.content
				padding 0 12px
				line-height 24px
				font-size 12px
				color rgb(240, 20, 20)
		.supports-warp
			padding 0 18px
			.support	
				padding 16px 0
				border-1px(rgba(7, 17, 27,.1))
				&:last-child
					border-none()
				.discount_2
					display inline-block
					vertical-align top
					line-height 16px
				.text
					line-height 16px
					display inline-block
					vertical-align top
					font-size 12px
					color rgb(7, 17, 27)
					font-weight 200
		.pics	
			padding 18px
			.title
				margin-bottom 12px
				line-height 14px
				color rgb(7, 17, 27)
				font-size 14px	
			.pic-warp
				width 100%	
				overflow hidden
				white-space nowrap
				.pic-list
					font-size 0
					.pic-item
						width 120px
						height 90px
						margin-right 6px
						display inline-block
						&:last-child	
							margin 0
		.infos		
			padding 18px
			.title
				padding-bottom 12px
				line-height 14px
				color rgb(7, 17, 27)
				font-size 14px	
				border-1px(rgba(7, 17, 27,.1))
			.infos-item			
				padding 16px 12px
				border-1px(rgba(7, 17, 27,.1))
				line-height 16px
				font-size 12px
				color rgb(7, 17, 27)
				font-weight 200
				&:last-child
					border-none()
					
</style>
