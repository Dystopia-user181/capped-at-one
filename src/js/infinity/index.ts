import { InfinityMonomension } from "./monomensions";

import { player } from "@/js/player";

export const InfHandler = {
	get isUnlocked() { return player.infinity.bestIP > 0; },

	get progressToNext() { return player.infinity.ipProgress; },
	set progressToNext(v) { player.infinity.ipProgress = v; },
	get progressRequired() {
		return Math.pow(2, player.infinity.ip * 100);
	},

	tick(diff: number) {
		while (this.progressToNext >= this.progressRequired && player.infinity.ip < 1) {
			this.progressToNext -= this.progressRequired;
			player.infinity.ip += 0.01;
			player.infinity.bestIP = Math.max(player.infinity.bestIP, player.infinity.ip);
		}
		for (let i = 1; i <= 8; i++) {
			let production = InfinityMonomension(i).production * diff;
			for (let j = i - 1; j >= 1; j--) {
				InfinityMonomension(j).amount += production;
				production *= InfinityMonomension(j).multiplier * diff / (i - j + 1);
			}
			player.infinity.infPow += production;
		}
	},
};