import { Strikes } from "@/js/strikes";

import { GlyphGenerator } from "./generator";
import { GlyphUnlocks } from "./unlocks";

import { TimeUpgrades } from "@/js/time";

import { player } from "@/js/player";

export * from "./glyph-types";
export * from "./generator";
export * from "./effects";
export * from "./unlocks";

export const GlyphHandler = {
	get isUnlocked() {
		return Strikes[2].isUnlocked;
	},

	get powerPerTick() {
		let base = 0.02;
		base *= TimeUpgrades.glyphPowStatic.effectOrDefault(1);
		base *= TimeUpgrades.glyphPowDynamic.effectOrDefault(1);
		return base;
	},
	tick(diff: number) {
		if (!this.isUnlocked) return;
		player.glyphs.glyphPower += this.powerPerTick * diff;
		if (!GlyphUnlocks.noCap.effect) player.glyphs.glyphPower = Math.min(player.glyphs.glyphPower, 1);
		if (player.glyphs.glyphPower >= 1) GlyphGenerator.makeNewGlyph();
	},
};