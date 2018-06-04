<template lang="html">
	<div class="ratingselect">
		<div class="ratingtype border-1px">
			<span class="block positive" :class="{'active':selectTypeData===2}" @click="select(2)">
				{{desc.all}}
				<span class="count">{{ratings.length}}</span>
			</span>
			<span class="block positive" :class="{'active':selectTypeData===0}" @click="select(0)">
				{{desc.positive}}
				<span class="count">{{positives.length}}</span>
			</span>
			<span class="block negtive" :class="{'active':selectTypeData===1}" @click="select(1)">
				{{desc.negtive}}
				<span class="count">{{negtives.length}}</span>
			</span>
		</div>
		<div class="switch border-1px" @click="toggleContent">
			<i class="icon-check_circle"  :class="{'on':onlyContentData}"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	const POSITIVE =0;
	const NEGTIVE =1;
	const ALL =2;

	export default {
		props:{
			ratings:{
				type:Array,
				default() {
					return []
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default() {
					return {
						all:'全部',
						positive:'满意',
						negtive:'不满意'
					}
				}
			}
		},
		data() {
			return {
				selectTypeData:this.selectType,
				onlyContentData:this.onlyContent
			}
		},
		watch: {
			selectType(type) {
				this.selectTypeData=type
			},
			onlyContent(content) {
				this.onlyContentData=content
			}
		},
		computed: {
			positives() {
				return this.ratings.filter((rating)=> {
					return rating.rateType===POSITIVE
				})
			},
			negtives() {
				return this.ratings.filter((rating)=> {
					return rating.rateType===NEGTIVE
				})
			}
		},
		methods: {
			select(type) {
				this.selectTypeData=type;
				this.$emit('select-type',type);
			},
			toggleContent() {
				this.onlyContentData=!this.onlyContentData;
				this.$emit('only-content',this.onlyContentData);
			}
		}
		
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixin.styl"
	
	.ratingselect
		.ratingtype
			padding 18px 0
			margin 0 18px
			border-1px(rgba(7,17,27,.1))
			font-size 0
			.block
				display inline-block
				padding 8px 12px
				line-height 16px
				border-radius 2px
				margin-right 8px
				color rgb(77, 85, 93)
				font-size 12px
				&.active
					color #fff
				.count
					margin-left 2px
					font-size 8px
				&.positive
					background-color rgba(0, 160, 220, .2)
					&.active
						background-color rgb(0, 160, 220)
				&.negtive
					background-color rgba(77, 85, 93, .2)	
					&.active
						background-color rgb(77, 85, 93)
		.switch
			font-size 0px
			line-height 24px
			padding 12px 18px
			border-1px (rgba(7, 17, 27, .1))
			color rgb(147,157,159)
			.icon-check_circle
				display inline-block
				vertical-align top
				margin-right 4px
				font-size 24px
				&.on
					color #00c850
			.text	
				font-size 12px
				display inline-block
				vertical-align top
</style>
