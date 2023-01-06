import { player } from "@/js/player";

function isDimId(v: number): v is OneToEight {
	return v >= 1 && v <= 8;
}

export const SurgeHandler = {
	get boostAmount() { return player.monomensions.antimatter.surge.boost; },
	set boostAmount(v: number) { player.monomensions.antimatter.surge.boost = v; },

	get selectedMono() { return player.monomensions.antimatter.surge.monoId; },
	set selectedMono(v: number) {
		if (!isDimId(v)) throw Error(`ID ${v} passed into SurgeHandler.selectedMono`);
		if (!this.canSurge) return;
		player.monomensions.antimatter.surge.monoId = v;
	},

	get timePerSurge() {
		return 20;
	},

	get isUnlocked() { return player.monomensions.antimatter.unlocks >= 4; },

	get effect() {
		return Math.pow(10, this.boostAmount);
	},
	tick(diff: number) {
		this.boostAmount = Math.max(this.boostAmount - diff / this.timePerSurge, 0);
	},
	get canSurge() {
		return this.boostAmount <= 0;
	},
	doSurge() {
		this.boostAmount = 1;
	}
};