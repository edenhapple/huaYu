<template lang="html">
  <div class="goods">
    <div class="menu-warp" ref="menuWarp">
    	<ul>
    		<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
    			<span class="text border-1px">
    				<supports v-show="item.type>0" :size="3" :suppertType="item.type"></supports>
    				<span v-html="item.name"></span>
    			</span>
    		</li>
    	</ul>
    </div>
    <div class="foods-warp" ref="foodWarp">
    	<ul>
    		<li v-for="item in goods" class="food-list food-list-hook">
    			<h1 class="title" v-html="item.name"></h1>
    			<ul>
    				<li v-for="food in item.foods" class="food-item border-1px" @click.stop.prevent="selectedFood(food,$event)">
    					<div class="icon">
    						<img width="57" height="57" :src="food.icon">
    					</div>
    					<div class="content">
    						<h2 class="name" v-html="food.name"></h2>
    						<p class="desc" v-html="food.description"></p>
    						<div class="extra">
    							<span class="cont" v-html="'月销售'+food.sellCount+'份'"></span><span v-html="'月好评'+food.rating+'%'"></span>
    						</div>
    						<div class="price">
    							<span class="now" v-html="'¥'+food.price"></span>
    							<span class="old" v-show="food.oldPrice" v-html="'¥'+food.oldPrice"></span>
    						</div>
    						<div class="cartcontrol-warp">
    							<cartcontrol :food="food"></cartcontrol>
    						</div>
    					</div>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </div>
    <food :food.sync="selectFood" ref="foodtmp"></food>
    <shopcart ref="shopcart" :selectFoods="selectFoodsCom" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
	import supports from '@/components/supports/supports';  //折扣标识
	import shopcart from '@/components/shopcart/shopcart';  //购物车
	import cartcontrol from '@/components/cartcontrol/cartcontrol';  //购物车加减
	import food from '@/components/food/food';  //商品详情
	import BScroll from 'better-scroll';  //滑动插件

	const ERROK=0;
	export default {
		props: {
			seller: {
				type:Object
			}
		},
		data() {
			return {
				goods:[],
				listHeight:[],
				scrollY:0,
				selectFood:{}
			}
		},
		computed: {
			currentIndex() {
				for(let i=0;i<this.listHeight.length;i++){
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];
					if (!height2 || (this.scrollY>=height1 && this.scrollY<height2) ) {
						return i
					}
				}
				return 0
			},
			selectFoodsCom() {
				let foods=[];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food)
						}
					})
				})
				return foods;
			}
		},
		created() {
			let that=this;
	    this.$axios.get('/api/goods').then((res) => {
	      if(res.data.errno===ERROK){
					this.goods=res.data.data;
					this.$nextTick(()=>{
						this._initScroll();
						this._calculateHeight();
					})
	      }
	    })

		},
		methods: {
			selectMenu(index,e) {
				if (!e._constructed) {
					return
				}
				let foodList =this.$refs.foodWarp.getElementsByClassName('food-list-hook');
				let el =foodList[index];
				this.foodScroll.scrollToElement(el,300)
			},
			selectedFood(food,event) {
				this.selectFood=food;
				this.$refs.foodtmp.show();
			},
			_initScroll() {
				this.menuScroll= new BScroll(this.$refs.menuWarp,{
					click:true
				});
				this.foodScroll= new BScroll(this.$refs.foodWarp,{
					click:true,
					probeType:3
				});
				this.foodScroll.on('scroll',(pos)=> {
					this.scrollY=Math.abs(Math.round(pos.y))
				})
			},
			_calculateHeight() {
				let foodList =this.$refs.foodWarp.getElementsByClassName('food-list-hook');
				let height =0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item=foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height)
				}
			}
		},
		components: {
			supports,
			shopcart,
			cartcontrol,
			food
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.goods
		display flex
		width 100%
		position absolute
		top 176px
		bottom 46px
		overflow hidden
		.menu-warp
			flex 0 0 80px
			width 80px
			background-color #f3f5f7
			.menu-item
				display table
				height 54px
				width 56px
				line-height 14px
				padding 0 12px
				&.current
					position relative
					z-index 10
					margin-top -1px
					background-color #fff
					font-weight 700
					.text
						border-none()
				.text
					display table-cell
					width 56px
					vertical-align middle
					font-size 12px
					border-1px(rgba(7, 17, 27, .1))
		.foods-warp
			flex 1
			.title
				padding-left 14px
				height 26px
				line-height 26px
				font-size 12px
				color #93999f
				border-left 2px solid #d9dde1
				background-color #f3f5f7
			.food-item
				display flex 
				margin 18px
				padding-bottom 18px
				border-1px(rgba(7, 17, 27, .1))	
				&:last-child
					border-none()
					padding-bottom 0
				.icon
					flex 0 0 57px
					margin-right 10px
				.content		
					flex 1
					position relative
					.name
						margin 2px 0 8px 0
						height 14px
						line-height 14px
						font-size 14px
						color rgb(7, 17, 27)
						overflow hidden
						text-overflow ellipsis
						white-space nowrap
					.desc,.extra
						line-height 10px
						font-size 10px
						color rgb(147, 153, 159)	
					.desc	
						line-height 12px
						margin-bottom 8px
					.extra
						.cont
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
						right 0px
						bottom 12px		
</style>
