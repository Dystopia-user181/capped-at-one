<script setup lang="ts">
import { AMHandler } from "@/js/antimatter";
import { SacrificeHandler } from "@/js/antimatter/sacrifice";

import { Modals } from "@/js/ui/modals";

import { player } from "@/js/player";

import { format, formatOrder, formatX } from "@/utils";
</script>

<template>
	<div
		v-if="player.monomensions.antimatter.unlocks >= 3"
		class="c-sacrifice-menu"
	>
		You have {{ format(player.monomensions.antimatter.sacrifice) }} Sacrifice Points, boosting the
		{{ formatOrder(player.monomensions.antimatter.unlocks) }} Anti Monomension by
		{{ formatX(SacrificeHandler.effect) }} (x<sup>0.5</sup>)
		<br>
		Rough sacrifice formula: (AM - {{ format(AMHandler.baseAM) }}) *
		({{ formatOrder(player.monomensions.antimatter.unlocks) }} mono)<sup>2</sup>
		<br>
		<button
			class="c-sacrifice-menu__button c-button-good"
			:disabled="!SacrificeHandler.canSac"
			@click="Modals.sacrifice.show()"
		>
			<template v-if="SacrificeHandler.canSac">
				Reset your Antimatter and Anti Monomensions for {{ format(SacrificeHandler.sacAmount) }}
				Sacrifice Points
			</template>
			<template v-else>
				Reach {{ format(AMHandler.baseAM) }} AM and buy the
				{{ formatOrder(player.monomensions.antimatter.unlocks) }} Anti Monomension to sacrifice
			</template>
		</button>
	</div>
</template>

<style scoped>
.c-sacrifice-menu {
	margin-top: 7px;
}

.c-sacrifice-menu__button {
	font-size: 13px;
	width: 250px;
	height: 75px;
}
</style>