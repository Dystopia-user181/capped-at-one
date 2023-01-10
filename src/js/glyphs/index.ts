import { player } from "@/js/player";

export type { GlyphData } from "./glyph-types";
export { GlyphEffectHandler, GlyphEffect } from "./effects";
export { GlyphType, GlyphTypes } from "./glyph-types";

export const GlyphHandler = {
	get isUnlocked() {
		return player.monomensions.antimatter.unlocks >= 6;
	},

	tick(diff: number) {
		if (!this.isUnlocked) return;
		player.glyphs.glyphPower = Math.min(player.glyphs.glyphPower + 0.01 * diff, 1);
	},

	newRarity() {
		const rng = Math.random();
		return Math.pow(rng, 0.3) * 0.35 + Math.pow(rng, 10) * 0.2;
	}
};