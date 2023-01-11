import { player } from "@/js/player";

import { AntimatterMonomension, baseCosts } from "./monomensions";
import { SurgeHandler } from "./surge";
import { TickspeedUpgrade } from "./tickspeed";

import { TimeDilationHandler, TimeReversal, TimeUpgrades } from "@/js/time";

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
		return base;
	},
	get antimatterPerSec() {
		return AntimatterMonomension(1).production;
	},
	tick(_diff: number) {
		if (player.antimatter >= this.cap) return;
		const repeat = TimeReversal.isActive ? Math.max(Math.min(Math.ceil(_diff), 100), 1) : 1;
		const diff = _diff / repeat;
		for (let i = 0; i < repeat; i++) {
			SurgeHandler.tick(diff);
			const reverse = TimeReversal.isActive ? -1 : 1;
			for (let i = 1; i <= 8; i++) {
				let production = AntimatterMonomension(i).production * diff * reverse;
				for (let j = i - 1; j >= 1; j--) {
					AntimatterMonomension(j).amount += production;
					production *= AntimatterMonomension(j).multiplier * this.timeSpeedupFactor * diff * reverse;
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
		return Math.pow(player.monomensions.antimatter.unlocks >= 6 ? 30 : 10, player.monomensions.antimatter.unlocks);
	},

	reset() {
		player.monomensions.antimatter.unlocks++;
		player.antimatter = this.baseAM;
		player.monomensions.antimatter.tickspeed = 0;
		player.monomensions.antimatter.sacrifice = 0;
		player.time.tachyonMatter = 0;
		SurgeHandler.boostAmount = 0;
		for (let i = 1; i <= 8; i++) AntimatterMonomension(i).reset();
	}
};