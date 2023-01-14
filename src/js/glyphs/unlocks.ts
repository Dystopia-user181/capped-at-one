import { InfHandler } from "@/js/infinity";

import { player } from "@/js/player";

import { BitUpgradeState, run } from "@/utils";

interface GlyphUnlockConfig {
	id: number,
	currency: number,
	cost: number,
	isUnlocked?: () => boolean,

	description: string,
	currencyDisplay: string,
}

export class GlyphUnlockState extends BitUpgradeState<GlyphUnlockConfig, boolean> {
	get bits() { return player.glyphs.unlocks; }
	set bits(v) { player.glyphs.unlocks = v; }

	get currencyAmount() { return this.config.currency; }
	set currencyAmount(v) { this.config.currency = v; }

	get isUnlocked() { return run(this.config.isUnlocked) ?? true; }

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
	glyphSac: new GlyphUnlockState({
		id: 1,
		get currency() { return player.monomensions.antimatter.sacrifice; },
		set currency(v) { player.monomensions.antimatter.sacrifice = v; },
		cost: 2e3,

		description: "Unlock Glyph Sacrifice",
		currencyDisplay: "Sacrifice Points",
	}),
	infGlyphs: new GlyphUnlockState({
		id: 2,
		get currency() { return player.infinity.ip; },
		set currency(v) { player.infinity.ip = v; },
		cost: 0.07,
		isUnlocked: () => InfHandler.isUnlocked,

		description: "Unlock Infinity Glyphs",
		currencyDisplay: "IP",
	}),
	noCap: new GlyphUnlockState({
		id: 3,
		get currency() { return player.infinity.infPow; },
		set currency(v) { player.infinity.infPow = v; },
		cost: 1e10,
		isUnlocked: () => InfHandler.isUnlocked,

		description: "Glyph Power is uncapped",
		currencyDisplay: "Infinity Power",
	})
};

export const GlyphUnlockHandler = {
	get isTimeGlyphUnlocked() {
		return GlyphUnlocks.timeGlyphs.effect;
	},
	get isInfGlyphUnlocked() {
		return GlyphUnlocks.infGlyphs.effect;
	}
};