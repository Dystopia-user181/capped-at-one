import { AntimatterMonomension } from "@/js/antimatter/monomensions";

import { TimeDilationHandler, TimeRebuyables, TimeUpgrades } from ".";
import { TachyonEngine } from "./engines";

import { GlyphEffect, GlyphEffectHandler } from "@/js/glyphs";

import { player } from "@/js/player";

export const TimeReversal = {
	get isActive() { return player.time.reversing; },
	set isActive(v: boolean) { player.time.reversing = v; },

	toggle() {
		this.isActive = !this.isActive;
	},

	get tpPerSec() {
		let base = 0.1;
		base *= TimeUpgrades.tpActive.effectOrDefault(1);
		base *= Math.pow(TimeDilationHandler.dilationFactor, TimeRebuyables.gainBasedOnDil.effect);
		base *= GlyphEffectHandler.effectOrDefault(GlyphEffect.tachMult, 1);
		base *= Math.log(player.monomensions.antimatter.sacrifice + 1) *
			GlyphEffectHandler.effectOrDefault(GlyphEffect.tachMultBySac, 0) + 1;

		base -= TachyonEngine.consumption;
		return base;
	},
	tick(diff: number) {
		if (player.antimatter <= 0) {
			this.isActive = false;
			player.antimatter = 0;
		}
		for (let i = 1; i <= player.monomensions.antimatter.unlocks; i++) {
			if (AntimatterMonomension(i).amount <= 0) {
				this.isActive = false;
				AntimatterMonomension(i).amount = 0;
			}
		}
		if (!this.isActive) return;
		player.time.tachyonMatter += this.tpPerSec * diff;
		TachyonEngine.tick(diff);
	}
};