<script setup lang="ts">
import { TimeRebuyables } from "@/js/time/upgrades";

import { format } from "@/utils";

const { upgName } = defineProps<{
	upgName: keyof typeof TimeRebuyables
}>();

const upgrade = TimeRebuyables[upgName];
</script>

<template>
	<div class="c-time-rebuyable-wrapper">
		<button
			class="c-time-rebuyable c-button-good"
			:disabled="!upgrade.canAfford"
			@click="upgrade.buy();"
		>
			<span v-html="upgrade.description" />
			<br>
			Cost: {{ format(upgrade.cost, 2, 2) }} Tachyon Matter
		</button>
		<button
			v-if="upgrade.isTogglable"
			class="c-time-rebuyable__toggle c-button-good"
			@click="upgrade.toggle();"
		>
			{{ upgrade.isToggledOn ? "ON" : "OFF" }}
		</button>
	</div>
</template>

<style scoped>
.c-time-rebuyable-wrapper {
	width: 220px;
	height: 160px;
	margin: 3px;
	display: flex;
	justify-content: stretch;
	flex-direction: column;
}

.c-time-rebuyable {
	width: 100%;
	height: 100%;
	padding: 0 15px;
	font-size: 13px;
	transition: all 0.2s;
	vertical-align: top;
}

.c-time-rebuyable:not(:disabled) {
	background: black;
	border: 2px solid var(--colour-dilation);
	color: var(--colour-dilation);
}

.c-time-rebuyable__toggle {
	width: 100%;
	height: 35px;
	padding: 0;
	margin-top: 4px;
	background: black;
	border: 2px solid var(--colour-dilation);
	color: var(--colour-dilation);
}
</style>