import { Strikes } from "@/js/strikes";

import { AntimatterMonomension, baseCosts } from "./monomensions";
import { SurgeHandler } from "./surge";
import { TickspeedUpgrade } from "./tickspeed";

import { TimeDilationHandler, TimeReversal, TimeUpgrades } from "@/js/time";

import { player } from "@/js/player";

export const AMHandler = {
	get cap() {
		return 1;
	},
	get timeSpeedupFactor() {
		let base = 1;
		base *= TickspeedUpgrade.effect;
		base /= TimeDilationHandler.dilationFactor;
		if (TimeReversal.isActive) {
			base /= TimeUpgrades.tpIdle.effectOrDefault(1);
			base *= TimeUpgrades.tpActive.effectOrDefault(1);
		}
		base *= this.descensionTimeBoost;
		return base;
	},
	get antimatterPerSec() {
		return AntimatterMonomension(1).production;
	},
	get capAt1s() {
		return Strikes[3].isUnlocked && player.monomensions.antimatter.unlocks >= 7;
	},
	get timeElapsed() { return player.monomensions.antimatter.timeElapsed; },
	set timeElapsed(v) { player.monomensions.antimatter.timeElapsed = v; },
	get timeLeft() { return this.capAt1s ? 1 - this.timeElapsed : Infinity; },
	tick(_diff: number) {
		if (player.antimatter >= this.cap && !TimeReversal.isActive) return;
		const repeat = (TimeReversal.isActive || player.auto.surge) ? Math.min(Math.ceil(_diff), 100) : 1;
		const diff = repeat === 0 ? 0 : _diff / repeat;
		const diffCapped = repeat === 0 ? 0 : Math.min(_diff, this.timeLeft) / repeat / (this.capAt1s ? 200 : 1);
		for (let i = 0; i < repeat; i++) {
			if (AntimatterMonomension("current").amount > 0 && !TimeReversal.isActive) this.timeElapsed += diffCapped;
			if (this.timeLeft > 0) SurgeHandler.tick(diff);
			const antidimDiff = TimeReversal.isActive ? -diff / (this.capAt1s ? 200 : 1) : diffCapped;
			for (let i = 1; i <= 8; i++) {
				let production = AntimatterMonomension(i).production * antidimDiff;
				for (let j = i - 1; j >= 1; j--) {
					AntimatterMonomension(j).amount += production;
					production *= AntimatterMonomension(j).multiplier * this.timeSpeedupFactor * antidimDiff /
					(i - j + 1);
				}
				player.antimatter = Math.min(player.antimatter + production, this.cap);
			}
			TimeReversal.tick(diff);
		}
	},
	get baseAM() {
		return baseCosts[player.monomensions.antimatter.unlocks - 1];
	},
	get slowdownFactor() {
		return Math.pow(Strikes[2].isUnlocked ? 30 : 10, player.monomensions.antimatter.unlocks);
	},

	_resetResources() {
		player.antimatter = this.baseAM;
		player.monomensions.antimatter.tickspeed = 0;
		player.monomensions.antimatter.sacrifice = 0;
		player.time.tachyonMatter = 0;
		player.monomensions.antimatter.timeElapsed = 0;
		SurgeHandler.boostAmount = 0;
		for (let i = 1; i <= 8; i++) AntimatterMonomension(i).reset();
	},
	ascend() {
		player.monomensions.antimatter.unlocks++;
		if (player.monomensions.antimatter.maxUnlocks < player.monomensions.antimatter.unlocks)
			player.monomensions.antimatter.maxUnlocks = player.monomensions.antimatter.unlocks as OneToEight;
		this._resetResources();
	},
	descend() {
		player.monomensions.antimatter.unlocks--;
		this._resetResources();
	},
	get minDescensionReached() {
		return player.monomensions.antimatter.unlocks <= 5;
	},
	get maxAscensionReached() {
		return player.monomensions.antimatter.unlocks >= player.monomensions.antimatter.maxUnlocks;
	},
	get descensionTimeBoost() {
		return player.monomensions.antimatter.unlocks < player.monomensions.antimatter.maxUnlocks ? 10 : 1;
	},
};