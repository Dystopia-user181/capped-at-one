import { GlyphType } from "./glyph-types";

import { player } from "@/js/player";

import { format, formatPercents, formatX } from "@/utils";

export enum GlyphEffect {
	amMult,
	tickMult,
	amPow,
	unlockNerf
}

export const GlyphEffects = {
	antimatter: [{
		id: GlyphEffect.amMult,
		description: (x: number) => `Multiply all Anti Monomensions by ${formatX(x)}`,
		effect: (x: number) => Math.pow(3 + x, 1.5),
	},
	{
		id: GlyphEffect.tickMult,
		description: (x: number) => `Incrcease effectiveness of tickspeed by ${formatPercents(x)}`,
		// https://www.desmos.com/calculator/iwiddbaozx
		effect: (x: number) => 0.08 - Math.pow(1.8 * x + 4.5, -0.3) * 0.1,
	},
	{
		id: GlyphEffect.amPow,
		description: (x: number) => `Raise all Anti Monomension multipliers to ^${format(1 / x)} below 1
		and ^${format(x)} above 1`,
		effect: (x: number) => 1.05 * Math.pow(x + 1, 0.2),
	},
	{
		id: GlyphEffect.unlockNerf,
		description: (x: number) => `Decrease the slowdown of each unlock by ${formatX(x)}`,
		effect: (x: number) => Math.pow(3.2 + x, 0.24),
	}],
	infinity: []
};

export const GlyphEffectHandler = {
	effectiveLevel(glyph = player.glyphs.current) {
		if (!glyph) return 0;
		return glyph.level * (glyph.rarity + 0.5);
	},
	getEffects(glyph = player.glyphs.current): Partial<Record<GlyphEffect, number>> {
		if (!glyph) return {};
		const effectiveLevel = this.effectiveLevel(glyph);
		const effects: Partial<Record<GlyphEffect, number>> = {};
		const type = GlyphType[glyph.type] as keyof typeof GlyphType;
		for (let i = 0; i < GlyphEffects[type].length; i++) {
			const effectData = GlyphEffects[type][i];
			if (glyph.effects & (1 << i)) effects[effectData.id] = effectData.effect(effectiveLevel);
		}
		return effects;
	},
	getEffectDescriptions(glyph = player.glyphs.current): string {
		if (!glyph) return "";
		const effectiveLevel = this.effectiveLevel(glyph);
		let effectString = "";
		const type = GlyphType[glyph.type] as keyof typeof GlyphType;
		for (let i = 0; i < GlyphEffects[type].length; i++) {
			const effectData = GlyphEffects[type][i];
			if (glyph.effects & (1 << i))
				effectString += effectData.description(effectData.effect(effectiveLevel));
		}
		return effectString;
	},
	effectOrDefault(effect: GlyphEffect, def: number, glyph = player.glyphs.current) {
		return this.getEffects(glyph)[effect] ?? def;
	}
};