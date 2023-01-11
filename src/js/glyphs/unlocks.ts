import { player } from "@/js/player";

import { BitUpgradeState } from "@/utils";

interface GlyphUnlockConfig {
	id: number,
	currency: number,
	cost: number,

	description: string,
	currencyDisplay: string,
}

export class GlyphUnlockState extends BitUpgradeState<GlyphUnlockConfig, boolean> {
	get bits() { return player.glyphs.unlocks; }
	set bits(v) { player.glyphs.unlocks = v; }

	get currencyAmount() { return this.config.currency; }
	set currencyAmount(v) { this.config.currency = v; }

	get cost() { return this.config.cost; }
	get effect() { return this.canApply; }

	get description() { return this.config.description; }
	get currencyDisplay() { return this.config.currencyDisplay; }
}

export const GlyphUnlocks = {
	timeGlyphs: new GlyphUnlockState({
		id: 0,
		get currency() { return player.time.tachyonMatter; },
		set currency(v) { player.time.tachyonMatter = v; },
		cost: 8e5,

		description: "Unlock Time Glyphs",
		currencyDisplay: "Tachyon Matter",
	}),
};

export const GlyphUnlockHandler = {
	get isTimeGlyphUnlocked() {
		return GlyphUnlocks.timeGlyphs.effect;
	},
};