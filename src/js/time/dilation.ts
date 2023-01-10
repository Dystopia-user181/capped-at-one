import { AMHandler } from "@/js/antimatter";

import { TimeRebuyables } from ".";

import { player } from "@/js/player";

export const TimeDilationHandler = {
	get isUnlocked() {
		return player.monomensions.antimatter.unlocks >= 5;
	},
	get dilationFactor() {
		if (!this.isUnlocked) return 1;
		let base = Math.log10(player.antimatter + AMHandler.baseAM) - Math.log10(AMHandler.baseAM);
		base *= TimeRebuyables.dilNerf.effectOrDefault(1);
		return Math.pow(Math.max(base, 0) * 2 + 1, 2);
	}
};