<script setup lang="ts">
import AntimatterMonomensionRow from "./AntimatterMonomensionRow.vue";
import DilationPanel from "./DilationPanel.vue";
import SacrificeMenu from "./SacrificeMenu.vue";
import SurgeMenu from "./SurgeMenu.vue";
import TickspeedRow from "./TickspeedRow.vue";

import { Strikes } from "@/js/strikes";

import { AMHandler } from "@/js/antimatter";

import { player } from "@/js/player";

import { format, formatOrder, formatX } from "@/utils";
</script>

<template>
	<div>
		You have
		<span class="c-game-header__antimatter">
			{{ format(player.antimatter) }} / {{ format(AMHandler.cap) }}
		</span>
		(+{{ format(AMHandler.antimatterPerSec) }}/s) antimatter
	</div>
	Weight of unlocks: {{ formatX(1 / AMHandler.slowdownFactor) }} to Monomension multipliers
	<DilationPanel />
	<br>
	<br>
	<TickspeedRow />
	<AntimatterMonomensionRow
		v-for="i in 8"
		:key="i"
		:dim-id="i"
	/>
	<br>
	<button
		v-if="Strikes[3].isUnlocked && !AMHandler.minDescensionReached"
		class="c-dimboost-button c-button-good"
		@click="AMHandler.descend()"
	>
		Reset to the {{ formatOrder(player.monomensions.antimatter.unlocks - 1) }} Unlock,
		and while not in the current Unlock {{ formatX(10) }} time speed
	</button>
	<button
		v-if="Strikes[3].isUnlocked && !AMHandler.maxAscensionReached"
		class="c-dimboost-button c-button-good"
		@click="AMHandler.ascend()"
	>
		Reset to the {{ formatOrder(player.monomensions.antimatter.unlocks + 1) }} Unlock,
		and while not in the current Unlock {{ formatX(10) }} time speed
	</button>
	<button
		v-if="player.antimatter >= AMHandler.cap && player.monomensions.antimatter.unlocks < 8"
		class="c-dimboost-button c-button-good"
		@click="AMHandler.ascend()"
	>
		Reset your Antimatter and carry the Weight of an Unlock, but unlock Something New
	</button>
	<SacrificeMenu />
	<SurgeMenu />
</template>

<style scoped>
.c-game-header__antimatter {
	font-size: 25px;
	color: var(--colour-antimatter);
}

.c-dimboost-button {
	font-size: 14px;
	vertical-align: middle;
	width: 300px;
	height: 80px;
	margin: 0 5px;
}
</style>