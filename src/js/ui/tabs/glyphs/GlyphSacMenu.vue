<script setup lang="ts">
import { GlyphSacrificeHandler, GlyphTypes } from "@/js/glyphs";

import { player } from "@/js/player";

import { format, formatPercents } from "@/utils";
</script>

<template>
	<div
		v-if="GlyphSacrificeHandler.isUnlocked"
		class="c-glyph-sacrifice-container"
	>
		<h2>
			Glyph Sacrifice
		</h2>
		<template v-for="(glyphType, glyphName) in GlyphTypes">
			<div
				v-if="glyphType.isUnlocked"
				:key="'glyph-sac-' + glyphType"
			>
				<span
					class="c-glyph-sacrifice__header"
					:style="{
						color: glyphType.colour
					}"
				>
					<span class="c-glyph-sacrifice__symbol">{{ glyphType.symbol }}</span>
					{{ format(player.glyphs.sacrifice[glyphName], 2, 2) }}
				</span>
				<span
					v-if="player.glyphs.projected?.type.toString() === glyphName.toString()"
					class="c-glyph-sacrifice__gain-text"
				>
					(+{{ format(GlyphSacrificeHandler.sacrificeAmount(player.glyphs.projected), 2, 2) }})
				</span>
				<br>
				<span class="c-glyph-sacrifice__effect">
					+{{ formatPercents(GlyphSacrificeHandler.rarityBoost(glyphName)) }} rarity range to
					{{ glyphType.name }} Glyphs
				</span>
				<br>
				<br>
			</div>
		</template>
	</div>
</template>

<style scoped>
.c-glyph-sacrifice-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 350px;
	width: 300px;
	border: 2px solid white;
	background-color: rgba(255, 255, 255, 0.1);
	border-radius: 10px;
	padding: 0 10px;
	margin-left: 5px;
}

.c-glyph-sacrifice__header {
	font-size: 18px;
	font-weight: 500;
}

.c-glyph-sacrifice__symbol {
	font-size: 25px;
	font-weight: bold;
	text-shadow: 0 0 7px;
}

.c-glyph-sacrifice__gain-text {
	font-size: 12px;
	color: var(--colour-good);
}

.c-glyph-sacrifice__effect {
	font-size: 14px;
}
</style>