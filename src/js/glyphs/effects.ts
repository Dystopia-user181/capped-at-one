import { GlyphHandler, GlyphType } from ".";

import { player } from "@/js/player";

import { format, formatPercents } from "@/utils";

export enum GlyphEffect {
	// Antimatter
	amMult,
	tickMult,
	amPow,
	dilNerf,

	// Time
	tachMult,
	timeBuyableCost,
}

export const GlyphEffects = {
	[GlyphType.antimatter]: [{
		id: GlyphEffect.amMult,
		description: (x: number) => `Multiply all Anti Monomensions by ${format(x)}`,
		effect: (x: number) => Math.pow(3 + x, 1.5),
	},
	{
		id: GlyphEffect.tickMult,
		description: (x: number) => `Increase effectiveness of tickspeed by ${formatPercents(x)}`,
		// https://www.desmos.com/calculator/iwiddbaozx
		effect: (x: number) => Math.log10(x + 1) / 10 + 0.02,
	},
	{
		id: GlyphEffect.amPow,
		description: (x: number) => `Raise all Mono multipliers to ^${format(1 / x)} if < 1
		and ^${format(x)} if > 1`,
		effect: (x: number) => 1.05 * Math.pow(x + 1, 0.2),
	},
	{
		id: GlyphEffect.dilNerf,
		description: (x: number) => `Dilation effect is moved ${format(x)} orders of magnitude later`,
		effect: (x: number) => 5 + 4 * x,
	}],
	[GlyphType.time]: [{
		id: GlyphEffect.tachMult,
		description: (x: number) => `Multiply Tachyon Matter gain by ${format(x)}`,
		effect: (x: number) => x + 3,
	},
	{
		id: GlyphEffect.timeBuyableCost,
		description: (x: number) => `Divide repeatable Time upgrade costs by ${format(x)}`,
		effect: (x: number) => (x * x) / 10 + x + 4,
	}],
	[GlyphType.infinity]: [],
};

export const GlyphEffectHandler = {
	effectiveLevel(glyph = player.glyphs.current) {
		if (!glyph) return 0;
		return glyph.level * (glyph.rarity + 0.5);
	},
	getEffects(glyph = player.glyphs.current): Partial<Record<GlyphEffect, number>> {
		if (!glyph || !GlyphHandler.isUnlocked) return {};
		const effectiveLevel = this.effectiveLevel(glyph);
		const effects: Partial<Record<GlyphEffect, number>> = {};
		const type = glyph.type;
		for (let i = 0; i < GlyphEffects[type].length; i++) {
			const effectData = GlyphEffects[type][i];
			if (glyph.effects & (1 << i)) effects[effectData.id] = effectData.effect(effectiveLevel);
		}
		return effects;
	},
	getEffectDescriptions(glyph = player.glyphs.current): string {
		let effectString = "";
		if (glyph) {
			const effectiveLevel = this.effectiveLevel(glyph);
			const type = glyph.type;
			for (let i = 0; i < GlyphEffects[type].length; i++) {
				const effectData = GlyphEffects[type][i];
				const effect = effectData.effect(effectiveLevel);
				if (glyph.effects & (1 << i))
					effectString += `- ${effectData.description(effect).replaceAll("\n", "")}\n`;
			}
		}
		return effectString.trim() || "No effects";
	},
	effectOrDefault(effect: GlyphEffect, def: number, glyph = player.glyphs.current) {
		return this.getEffects(glyph)[effect] ?? def;
	}
};