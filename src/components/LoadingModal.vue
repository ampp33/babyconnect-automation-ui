<template>
	<transition name="fade">
		<div class="fog" v-if="visible">
			<div class="fulfilling-square-spinner">
				<div class="spinner-inner"></div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		visible: {
			default: false,
			type: Boolean
		}
	}
}
</script>

<style scoped>
.fog {
	position: fixed;
	height: 100%;
	width: 100%;
	left: 0px;
	top: 0px;
	background-color: rgba(0,0,0,.9);
}

.fulfilling-square-spinner,
.fulfilling-square-spinner * {
	box-sizing: border-box;
	margin: auto;
}

.fulfilling-square-spinner {
	height: 200px;
	width: 200px;
	position: absolute;
	top: calc(50% - 100px);
	left: calc(50% - 100px);
	border: 20px solid #ff1d5e;
	animation: fulfilling-square-spinner-animation 4s infinite ease;
}

.fulfilling-square-spinner .spinner-inner {
	vertical-align: top;
	display: inline-block;
	background-color: #ff1d5e;
	width: 100%;
	opacity: 1;
	animation: fulfilling-square-spinner-inner-animation 4s infinite ease-in;
}

@keyframes fulfilling-square-spinner-animation {
	0% {
		transform: rotate(0deg);
	}

	25% {
		transform: rotate(180deg);
	}

	50% {
		transform: rotate(180deg);
	}

	75% {
		transform: rotate(360deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes fulfilling-square-spinner-inner-animation {
	0% {
		height: 0%;
	}

	25% {
		height: 0%;
	}

	50% {
		height: 100%;
	}

	75% {
		height: 100%;
	}

	100% {
		height: 0%;
	}
}
</style>