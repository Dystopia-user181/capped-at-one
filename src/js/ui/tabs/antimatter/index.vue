<script setup lang="ts">
import AntimatterMonomensionRow from "./AntimatterMonomensionRow.vue";
import DilationPanel from "./DilationPanel.vue";
import SacrificeMenu from "./SacrificeMenu.vue";
import SurgeMenu from "./SurgeMenu.vue";
import TickspeedRow from "./TickspeedRow.vue";

import { AMHandler } from "@/js/antimatter";

import { player } from "@/js/player";

import { format, formatX } from "@/utils";
</script>

<template>
	<div>
		You have
		<span class="c-game-header__antimatter">
			{{ format(player.antimatter) }} / {{ format(AMHandler.cap) }}
		</span>
		(+{{ format(AMHandler.antimatterPerSec) }}/s) antimatter
	</div>
	Global slowdown factor: {{ formatX(Math.pow(0.1, player.monomensions.antimatter.unlocks)) }}
	<DilationPanel />
	<br>
	<br>
	<TickspeedRow />
	<AntimatterMonomensionRow
		v-for="i in 8"
		:key="i"
		:dim-id="i"
	/>
	<SacrificeMenu />
	<SurgeMenu />
	<br>
	<button
		v-if="player.antimatter >= AMHandler.cap && player.monomensions.antimatter.unlocks < 8"
		class="c-dimboost-button c-button-good"
		@click="AMHandler.reset()"
	>
		Reset your Antimatter and Antimatter Monomensions and slow down the game tenfold, but unlock Something New
	</button>
</template>

<style scoped>
.c-game-header__antimatter {
	font-size: 25px;
	color: var(--colour-antimatter);
}

.c-dimboost-button {
	font-size: 14px;
	width: 300px;
}
</style>