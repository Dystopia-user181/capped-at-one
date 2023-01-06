import { AMHandler } from ".";
import { AntimatterMonomension } from "./monomensions";
import { AntimatterRebuyableState } from "./antimatter-rebuyable-state";

import { player } from "@/js/player";

export const TickspeedUpgrade = new (class extends AntimatterRebuyableState<undefined> {
	get amount() { return player.monomensions.antimatter.tickspeed; }
	set amount(v: number) { player.monomensions.antimatter.tickspeed = v; }

	get isUnlocked() {
		return player.monomensions.antimatter.unlocks >= 2;
	}

	get effect() {
		return Math.pow(1.2, this.amount);
	}

	get cost() {
		return AMHandler.baseAM * 0.1 * Math.pow(8, this.amount);
	}

	get isPurchaseable() {
		return AntimatterMonomension("current").amount > 0;
	}
})(undefined);