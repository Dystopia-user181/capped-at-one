import { AMHandler } from ".";
import { AntimatterMonomension } from "./monomensions";

import { player } from "@/js/player";

export const SacrificeHandler = {
	get canSac() {
		return player.antimatter >= AMHandler.baseAM && AntimatterMonomension("current").amount > 0;
	},
	get sacAmount() {
		if (!this.canSac) return 0;
		let amount = (player.antimatter - AMHandler.baseAM) * (AntimatterMonomension("current").amount ** 2);
		amount *= Math.pow(100, player.monomensions.antimatter.unlocks) * 0.1;
		return amount;
	},
	doSac() {
		if (!this.canSac) return;
		player.monomensions.antimatter.sacrifice += this.sacAmount;
		player.antimatter = AMHandler.baseAM;
		for (let i = 1; i <= 8; i++) AntimatterMonomension(i).reset();
	},
	effectAtScore(x: number = player.monomensions.antimatter.sacrifice) {
		return Math.pow(1 + x, 0.5);
	},
	get effect() {
		return this.effectAtScore();
	}
};