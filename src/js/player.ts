import { reactive, toRaw } from "vue";

import { PlayerType } from "@/js/player-type";

import { migrations } from "@/js/migrations";
import { Modals } from "@/js/ui/modals";

import { deepAssign, downloadAsFile } from "@/utils";

// https://github.com/microsoft/TypeScript/issues/31816#issuecomment-593069149
type FileEventTarget = EventTarget & { files: FileList };
type FileEvent = Event & { target: FileEventTarget };

export const Player = {
	defaultStart(): PlayerType {
		return {
			antimatter: 0.1,
			monomensions: {
				antimatter: {
					1: { amount: 0, bought: 0 },
					2: { amount: 0, bought: 0 },
					3: { amount: 0, bought: 0 },
					4: { amount: 0, bought: 0 },
					5: { amount: 0, bought: 0 },
					6: { amount: 0, bought: 0 },
					7: { amount: 0, bought: 0 },
					8: { amount: 0, bought: 0 },
					unlocks: 1,
					tickspeed: 0,
					sacrifice: 0,
					surge: {
						monoId: 1,
						boost: 0
					},
				},
			},
			time: {
				reversing: false,
				tachyonMatter: 0,
				upgrades: 0,
				chosenUpgrade: 0,
				rebuyables: [0, 0, 0, 0],
				rebuyablesEnabled: [true, true, true, true],
			},
			glyphs: {
				glyphPower: 0,
				unlocks: 0,
				current: null,
				previous: null,
				projected: null,
			},
			options: {
				autosave: 1,
				exportCount: 0,
			},
			currentTab: "antimatter",
			vitalMarker: Player.storageKey,
			migrations: migrations.length
		};
	},
	storageKey: "igj2023-scarlet-newyear-cappedatone",
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	load(playerObj?: any) {
		Object.assign(player, Player.defaultStart());
		if (playerObj) {
			this.loadAndMigrateSave(playerObj);
		}
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	loadAndMigrateSave(playerObj: any) {
		deepAssign(player, playerObj);
		for (; player.migrations < migrations.length; player.migrations++) {
			migrations[player.migrations](player);
		}
	},
	loadSave() {
		try {
			const save = localStorage.getItem(this.storageKey);
			this.load(save ? JSON.parse(save) : undefined);
		} catch {
			this.load();
			Modals.message.showText(`
			The game is unable to save, possibly because you are in incognito. Please export your save
			manually before closing the game.
			`);
		}
	},
	savePlayer() {
		if (player.vitalMarker !== Player.storageKey) return;
		localStorage.setItem(this.storageKey, JSON.stringify(toRaw(player)));
	},
	reset() {
		Player.load();
		Player.savePlayer();
	},
	exportSave() {
		const dateString = `${new Date(Date.now() - (new Date().getTimezoneOffset() * 60 * 1000))
			.toISOString().split("T")[0]} ${new Date().toLocaleTimeString(undefined, { hour12: false })}`;
		player.options.exportCount++;
		downloadAsFile(
			`Antimatter Monomensions Save #${player.options.exportCount} (${dateString})`,
			window.btoa(JSON.stringify(toRaw(player)))
		);
	},
	importSave(event: FileEvent) {
		// This happens if the file dialog is canceled instead of a file being selected
		if (event.target.files.length === 0) return;

		const reader = new FileReader();
		reader.onload = function() {
			let text = reader.result;
			if (typeof text !== "string") {
				Modals.message.showText("Invalid savefile format.");
				return;
			}
			try {
				text = window.atob(text);
			} catch {
				Modals.message.showText("Invalid savefile format.");
				return;
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const playerObj = JSON.parse(text);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			if (typeof playerObj !== "object" || playerObj.vitalMarker !== Player.storageKey) {
				Modals.message.showText("Invalid savefile format.");
				return;
			}
			Player.load(playerObj);
			Player.savePlayer();
		};
		reader.readAsText(event.target.files[0]);
	}
};

export const player = reactive<PlayerType>({} as PlayerType);

setTimeout(() => Player.loadSave(), 0);

window.saveInterval = setInterval(() => {
	if (player.options.autosave) Player.savePlayer();
}, 10000);