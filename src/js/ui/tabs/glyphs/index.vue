<script setup lang="ts">
import CurrentGlyphs from "./CurrentGlyphs.vue";
import ProjectedGlyph from "./ProjectedGlyph.vue";

import { GlyphHandler } from "@/js/glyphs";

import { player } from "@/js/player";

import { format } from "@/utils";
</script>

<template>
	You have {{ format(player.antimatter) }} antimatter
	<div>
		You have
		<span class="c-game-header__glyph-power">
			{{ format(player.glyphs.glyphPower) }}
		</span>
		(+{{ format(GlyphHandler.powerPerTick) }}/s)
		Glyph Power
	</div>
	<br>
	<ProjectedGlyph />
	<br>
	<CurrentGlyphs />
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