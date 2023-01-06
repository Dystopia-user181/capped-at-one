import { player } from "@/js/player";

import { AntimatterMonomension, baseCosts } from "./monomensions";
import { SurgeHandler } from "./surge";
import { TickspeedUpgrade } from "./tickspeed";

export const AMHandler = {
	get cap() {
		return 1;
	},
	get antimatterPerSec() {
		return AntimatterMonomension(1).production;
	},
	tick(diff: number) {
		if (player.antimatter >= this.cap) return;
		SurgeHandler.tick(diff);
		for (let i = 1; i <= 8; i++) {
			let production = AntimatterMonomension(i).production * diff;
			for (let j = i - 1; j >= 1; j--) {
				AntimatterMonomension(j).amount += production;
				production *= AntimatterMonomension(j).multiplier * TickspeedUpgrade.effect * diff;
			}
			player.antimatter = Math.min(player.antimatter + production, this.cap);
		}
	},
	get baseAM() {
		return baseCosts[player.monomensions.antimatter.unlocks - 1];
	},

	reset() {
		player.monomensions.antimatter.unlocks++;
		player.antimatter = this.baseAM;
		player.monomensions.antimatter.tickspeed = 0;
		SurgeHandler.boostAmount = 0;
		for (let i = 1; i <= 8; i++) AntimatterMonomension(i).reset();
	}
};