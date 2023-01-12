/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
type migration = (player: any) => void;

export const migrations: migration[] = [
	player => {
		player.monomensions.antimatter.maxUnlocks = player.monomensions.antimatter.unlocks;
	}
];