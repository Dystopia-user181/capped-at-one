<script setup lang="ts">
import { player } from "@/js/player";

import { format, formatOrder } from "@/utils";

const unlocks = $computed(() => player.monomensions.antimatter.unlocks);
</script>

<template>
	You have {{ format(player.antimatter) }} antimatter
	<br>
	<br>
	<i>
		"The rate of everything is supposed to keep you from reaching 1.
		<br>
		Yet you keep consistently doing it.
		<br>
		Maybe we aren't trying hard enough."
	</i>
	<br>
	<br>
	<template v-if="unlocks < 8">
		Next at {{ formatOrder(unlocks + 1) }} Anti Monomensions unlocked
		<br>
	</template>
	<br>
	<template v-if="unlocks >= 5">
		<h2>Strike 1</h2>
		Time is dilated based on log(AM + starting AM) - log(starting AM)
		<br>
		Unlock Time Reversal
		<br>
		<br>
	</template>
	<template v-if="unlocks >= 6">
		<h2>Strike 2</h2>
		Each unlock weighs thirty instead of ten and tickspeed cost scales more
		<br>
		Unlock Glyphs
		<br>
		<br>
	</template>
</template>

<style scoped>
.c-game-header__glyph-power {
	font-size: 25px;
	color: var(--colour-glyphs);
}

.c-glyph-container--projected {
	margin: auto;
	border: 2px solid white;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
}
</style>