import { GlyphGenerator } from "./generator";

import { TimeUpgrades } from "@/js/time";

import { player } from "@/js/player";

export * from "./glyph-types";
export * from "./generator";
export * from "./effects";
export * from "./unlocks";

export const GlyphHandler = {
	get isUnlocked() {
		return player.monomensions.antimatter.unlocks >= 6;
	},

	get powerPerTick() {
		let base = 0.02;
		base *= TimeUpgrades.glyphPowStatic.effectOrDefault(1);
		base *= TimeUpgrades.glyphPowDynamic.effectOrDefault(1);
		return base;
	},
	tick(diff: number) {
		if (!this.isUnlocked) return;
		player.glyphs.glyphPower = Math.min(player.glyphs.glyphPower + this.powerPerTick * diff, 1);
		if (player.glyphs.glyphPower >= 1) GlyphGenerator.makeNewGlyph();
	},
};