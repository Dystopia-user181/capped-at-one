<script setup lang="ts">
</script>

<template>
	<div
		class="c-game-ui"
	/>
</template>

<style scoped>
.c-game-ui {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: hidden;
	position: relative;
}

.c-main-tabs {
	display: flex;
	width: 100%;
	flex: 1 0 auto;
}

.c-held-item {
	position: absolute;
	opacity: 0.8;
	width: 40px;
	height: 40px;
	padding-left: 30px;
	padding-top: 30px;
	filter: brightness(80%);
	pointer-events: none;
	z-index: 100;
}

.c-elixir-bg {
	z-index: 7;
	background-color: #903ae6;
	pointer-events: none;
	position: absolute;
	width: 100%;
	height: 100%;
	inset: 0;
}

.c-elixir-splashtext {
	z-index: 8;
	position: absolute;
	text-shadow: 0 0 7px #b27ee7;
	pointer-events: none;
	animation: a-elixir-splash 3s linear;
	width: 1000px;
	text-align: center;
}

@keyframes a-elixir-splash {
	0% { transform: translate(-50%, -50%) scale(0) rotate(0); opacity: 0; }
	50% { transform: translate(-50%, -50%) scale(1.5) rotate(360deg); opacity: 1; }
	100% { transform: translate(-50%, -50%) scale(0) rotate(360deg); opacity: 0; }
}
</style>