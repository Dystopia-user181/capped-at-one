import { TimeRebuyables } from "@/js/time";

import { GlyphEffect, GlyphEffectHandler } from "@/js/glyphs";

import { InfHandler } from "@/js/infinity";

import { player } from "@/js/player";

export const TachyonEngine = {
	get isUnlocked() { return TimeRebuyables.tachyonEngine.amount > 0; },
	get isOn() { return this.isUnlocked && player.time.tachyonEngine.on; },
	set isOn(v) { player.time.tachyonEngine.on = v; },
	get level() { return player.time.tachyonEngine.level; },
	set level(v) { player.time.tachyonEngine.level = v; },
	get isMinLevel() { return player.time.tachyonEngine.level <= 0; },
	get isMaxLevel() { return player.time.tachyonEngine.level >= TimeRebuyables.tachyonEngine.effect; },
	get consumption() {
		return (this.level <= 0 || !this.isOn) ? 0 : Math.pow(10, this.level - 1) * 0.5;
	},
	get production() {
		let base = (this.level * this.level) / 25;
		base *= GlyphEffectHandler.effectOrDefault(GlyphEffect.momentumGain, 1);
		return base;
	},
	get lossFactor() {
		let base = 0.04;
		base *= GlyphEffectHandler.effectOrDefault(GlyphEffect.momentumDecay, 1);
		return base;
	},

	get momentum() { return player.time.tachyonEngine.momentum; },
	set momentum(v) { player.time.tachyonEngine.momentum = v; },
	get momentumToProgress() { return 0.02; },
	tick(diff: number) {
		if (player.time.tachyonMatter < 0) {
			player.time.tachyonMatter = 0;
			this.isOn = false;
		}
		const p = this.production;
		const a = this.lossFactor;
		if (!this.isOn) {
			InfHandler.progressToNext += (this.momentum / a) * (1 - Math.exp(-a * diff)) * this.momentumToProgress;
			this.momentum /= Math.exp(a * diff);
			if (this.momentum < 1e-3) this.momentum = 0;
			return;
		}
		// m'(t) = p - am(t)
		// m(t) = p/a(1 - e^-at)
		const t = -Math.log(1 - this.momentum * a / p) / a;
		this.momentum = p * (1 - Math.exp(-a * (t + diff))) / a;
		// M(t) = pt/a + (p/a^2)e^-at + C
		const M1 = p * Math.exp(-a * t) / a / a;
		const M2 = p * diff / a + p * Math.exp(-a * (t + diff)) / a / a;
		InfHandler.progressToNext += (M2 - M1) * this.momentumToProgress;
	},
};