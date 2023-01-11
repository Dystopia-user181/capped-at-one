import { GlyphEffects, GlyphType, GlyphTypes } from ".";

import { player } from "@/js/player";

import { arr, enumAsArray } from "@/utils";

export interface GlyphData {
	type: GlyphType,
	level: number,
	effects: number,
	rarity: number,
}

export const GlyphGenerator = {
	get canGenerate() {
		return player.glyphs.glyphPower >= 1;
	},
	get newLevel() {
		return Math.floor(Math.pow(player.glyphs.glyphPower, 0.1));
	},
	newRarity() {
		const rng = Math.random();
		return Math.pow(rng, 0.3) * 0.35 + Math.pow(rng, 10) * 0.2;
	},
	randomEffects(type: GlyphType) {
		const rng = Math.random();
		// eslint-disable-next-line no-nested-ternary
		const effectsNumber = Math.min(rng < 0.3 ? 1 : 2, GlyphEffects[type].length);
		const effectsArray = Array.from(Array(GlyphEffects[type].length), (_, i) => 1 << i);
		let effects = 0;
		for (let i = 0; i < effectsNumber; i++) {
			const randomIdx = Math.floor(Math.random() * effectsArray.length);
			effects |= effectsArray[randomIdx];
			effectsArray.splice(randomIdx, 1);
		}
		return effects;
	},

	makeNewGlyph(force = false) {
		if (player.glyphs.projected && !force) return;
		const type = arr(enumAsArray(GlyphType).filter(x => GlyphTypes[x].isUnlocked)).random;
		player.glyphs.projected = {
			type,
			level: 1,
			effects: this.randomEffects(type),
			rarity: this.newRarity(),
		};
	},
	useNewGlyph() {
		player.glyphs.previous = player.glyphs.current;
		player.glyphs.current = player.glyphs.projected;
		player.glyphs.projected = null;
		player.glyphs.glyphPower = 0;
	},
	discardNewGlyph() {
		player.glyphs.projected = null;
		player.glyphs.glyphPower /= 4;
	},
	get canSwitchGlyph() {
		return player.glyphs.previous !== null && player.glyphs.current !== null;
	},
	switchGlyph() {
		if (!this.canSwitchGlyph) return;
		[player.glyphs.previous, player.glyphs.current] = [player.glyphs.current, player.glyphs.previous];
	}
};