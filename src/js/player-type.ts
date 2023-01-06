import { AntimatterMonoData } from "@/js/antimatter/player-types";
import { TabType } from "@/js/ui/tabs";

type Dimset<T> = { 1: T, 2: T, 3: T, 4: T, 5: T, 6: T, 7: T, 8: T };

export interface PlayerType {
	antimatter: number,
	monomensions: {
		antimatter: Dimset<AntimatterMonoData> & {
			unlocks: OneToEight,
			tickspeed: number,
			sacrifice: number,
			surge: {
				monoId: OneToEight,
				boost: number
			},
		}
	},
	options: {
		autosave: number,
		exportCount: number,
	},
	vitalMarker: string,
	migrations: number,
	currentTab: TabType
}