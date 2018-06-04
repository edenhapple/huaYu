<template lang="html">
	<span v-if="classType" class="icon" :class="classType"></span>
</template>

<script type="text/ecmascript-6">
const classMap=['decrease_','discount_','special_','invoice_','guarantee_']
export default {
	props: {
		size: {
			type:Number
		},
		suppertType: {
			type:Number
		}
	},
	computed: {
		classType() {
			let classes=classMap[this.suppertType] + this.size;
			return classes
		}
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin'
	.icon
		display inline-block
		vertical-align top
		background-repeat no-repeat		
		border-radius 2px
		&.decrease_1,&.discount_1,&.guarantee_1,&.invoice_1,&.special_1
			width 12px
			height 12px
			background-size 12px 12px
			margin-right 4px
			bg-img('decrease_1')
		&.discount_1
			bg-img('discount_1')
		&.guarantee_1
			bg-img('guarantee_1')
		&.invoice_1
			bg-img('invoice_1')
		&.special_1
			bg-img('special_1')
		&.decrease_2,&.discount_2,&.guarantee_2,&.invoice_2,&.special_2
			width 16px
			height 16px
			background-size 16px 16px
			margin-right 6px
			bg-img('decrease_2')
		&.discount_2
			bg-img('discount_2')
		&.guarantee_2
			bg-img('guarantee_2')
		&.invoice_2
			bg-img('invoice_2')
		&.special_2
			bg-img('special_2')
		&.decrease_3,&.discount_3,&.guarantee_3,&.invoice_3,&.special_3
			width 12px
			height 12px
			background-size 12px 12px
			margin-right 2px
			bg-img('decrease_3')
		&.discount_3
			bg-img('discount_3')
		&.guarantee_3
			bg-img('guarantee_3')
		&.invoice_3
			bg-img('invoice_3')
		&.special_3
			bg-img('special_3')
		&.decrease_4,&.discount_4,&.guarantee_4,&.invoice_4,&.special_4
			width 24px
			height 24px
			background-size 24px 24px
			margin-right 10px
			bg-img('decrease_4')
		&.discount_4
			bg-img('discount_4')
		&.guarantee_4
			bg-img('guarantee_4')
		&.invoice_4
			bg-img('invoice_4')
		&.special_4
			bg-img('special_4')	
</style>
