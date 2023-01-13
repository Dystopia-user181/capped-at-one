<script setup lang="ts">
import TachyonEngines from "../time/TachyonEngines.vue";

import { TimeDilationHandler } from "@/js/time";

import { player } from "@/js/player";

import { format, formatX } from "@/utils";
</script>

<template>
	You have {{ format(player.antimatter) }} antimatter
	<br>
	Time is {{ formatX(TimeDilationHandler.dilationFactor) }} dilated
	<div>
		You have
		<span class="c-game-header__infinity-points">
			{{ format(player.infinity.ip, 2, 2) }} / 1.00
		</span>
		Infinity Points
	</div>
	<TachyonEngines />
</template>

<style scoped>
.c-game-header__infinity-points {
	font-size: 25px;
	color: var(--colour-infinity);
}
</style>