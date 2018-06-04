<template lang="html">
  <div class="header">
    <div class="content-warp">
    	<div class="avatar">
    		<img width="64" height="64" :src="seller.avatar">
    	</div>
	    <div class="content">
	    	<div class="title">
	    		<span class="brand"></span>
	    		<span class="name" v-html="seller.name"></span>
	    	</div>
	    	<div class="description" v-text="seller.description+'/'+seller.deliveryTime+'分钟送达'"></div>
	    	<div v-if="seller.supports" class="support" @click="showDetail">
	    		<!-- <span class="icon" :class="classMap[seller.supports[0].type]"></span> -->
	    		<supports :size="1" :suppertType="seller.supports[0].type"></supports>
	    		<div class="text" v-html="seller.supports[0].description"></div>
	    	</div>	
	    </div>
			<div v-if="seller.supports" class="support-count" @click="showDetail">
				<span class="count" v-html="seller.supports.length+'个'"></span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
    </div>
    <div class="bulletin-warp" @click="showDetail">
    	<span class="bulletin-title"></span>
			<span class="bulletin-text" v-html='seller.bulletin'></span>
			<i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
    	<img :src="seller.avatar" width="100%" height="100%">
    </div>
    
    <transition name="fade">
		  <div v-show="detailShow" class="detail">
	    	<div class="detail-warp clearfix">
	    		<div class="detail-main">
	    			<h1 class="name" v-html="seller.name"></h1>
	    			<div class="star-warp">
	    				<star :size="48" :score="seller.score"></star>	
	    			</div>
	    			<div class="title">
	    				<div class="line"></div>
	    				<div class="text">优惠信息</div>
	    				<div class="line"></div>
	    			</div>
	    			<ul v-if="seller.supports" class="supports">
	    				<li class="support-item" v-for="(item,index) in seller.supports">
	    					<!-- <span class="icon" :class="classMap[seller.supports[index].type]"></span> -->
	    					<supports :size="2" :suppertType="seller.supports[index].type"></supports>
	    					<span class="text" v-html="seller.supports[index].description"></span>
	    				</li>
	    			</ul>
	    			<div class="title">
	    				<div class="line"></div>
	    				<div class="text">商家公告</div>
	    				<div class="line"></div>
	    			</div>
	    			<div class="bulletin">
	    				<p class="content" v-html="seller.bulletin"></p>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="detail-close">
	  			<i class="icon-close" @click="showDetail"></i>
	  		</div>
  		</div>	
		</transition>
    
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../star/star.vue';
import supports from '../supports/supports.vue';
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			detailShow:false
		}
	},
	methods: {
		showDetail() {
			this.detailShow=!this.detailShow
		}
	},
	created() {
		this.classMap=['decrease','discount','special','invoice','guarantee']
	},
	components: {
		star:star,
		supports:supports
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">  
	.header
		position relative
		overflow hidden
		color :#fff
		background-color :rgba(7, 17, 27, .5)
		.content-warp
			position relative
			padding :24px 12px 18px 24px
			font-size :0
			.avatar	
				display :inline-block
				vertical-align top
				img
					border-radius 2px
			.content	
				display :inline-block	
				margin-left :16px
				.title
					margin :2px 0 8px 0
					.brand
						display :inline-block
						vertical-align top
						width :30px
						height :18px
						bg-img('brand')
						background-repeat no-repeat
						background-size 30px 18px
					.name
						line-height 18px
						margin-left 6px
						font-size 16px
						font-weight bold	
				.description
					margin-bottom 10px
					font-size 12px
				.support	
					.text
						display inline-block
						line-height 16px
						height 16px
						font-size 10px
			.support-count
				position: absolute
				right 12px
				bottom 18px
				padding 0 8px
				height 22px
				line-height 22px
				border-radius 14px
				background-color rgba(0, 0, 0, .2)
				text-align center
				.count
					vertical-align top
					font-size 10px
				.icon-keyboard_arrow_right
					line-height 20px
					margin-left 2px
					font-size 10px
		.bulletin-warp
			position relative
			height 28px
			line-height 28px
			padding 0 22px 0 12px
			white-space nowrap
			overflow hidden
			text-overflow ellipsis
			background-color rgba(7, 17, 27, .2)
			.bulletin-title
				vertical-align top
				margin-top 9px
				display inline-block
				width 22px
				height 12px
				bg-img('bulletin')
				background-size 22px 12px
				background-repeat no-repeat
			.bulletin-text
				margin 0 4px
				font-size 10px	
			.icon-keyboard_arrow_right
					position absolute
					font-size 10px	
					right 10px
					top 11px
		.background
			position absolute
			top 0px
			left 0px
			width 100%
			height 100%
			z-index -1
			filter blur(10px)
		.detail
			position fixed
			z-index 99
			top 0px
			left 0px
			width 100%
			height 100%
			overflow auto
			background rgba(7, 17, 27, .8)
			backdrop-filter blur(10px)
			transition: all 0.3s linear
			&.fade-enter-active, &.fade-leave-active 
				background-color rgba(7, 17, 27, .8)   
			&.fade-enter, &.fade-leave-to
				background-color rgba(7, 17, 27, 0)	
				opacity 0
			.detail-warp
				min-height 100%
				width 100%
				.detail-main
					margin-top 64px
					padding-bottom 64px
					.name
						line-height 16px
						text-align center
						font-size 16px
						font-weight 700
					.star-warp
						margin-top 18px
						padding 2px 0
						text-align center	
					.title
						display flex
						width 80%
						margin 28px auto 24px 
						.line
							flex 1
							position relative
							top -6px
							border-bottom 1px solid rgba(255, 255, 255, .2)
						.text	
							padding 0 12px 
							font-weight 700
							font-size 14px
					.supports
						width 80%
						margin 0 auto
						.support-item
							padding 0 12px
							margin-bottom 12px
							font-size 0
							&:last-child
								margin-bottom 0
							.text
								font-size 12px		
								line-height 16px
					.bulletin
						width 80%
						margin 0 auto
						.content
							padding 0 12px
							line-height 24px
							font-size 12px
			.detail-close	
				position relative
				width 32px
				height 32px
				margin -64px auto 0
				font-size 32px
</style>
