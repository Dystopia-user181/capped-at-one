import AntimatterTab from "./antimatter/index.vue";
import DilationTab from "./time/index.vue";
import GlyphTab from "./glyphs/index.vue";
import StrikesTab from "./strikes/index.vue";

import { TimeDilationHandler } from "@/js/time";

import { GlyphHandler } from "@/js/glyphs";

import { player } from "@/js/player";

export const TabTypes = ["antimatter", "strikes", "dilation", "glyphs"] as const;
export type TabType = typeof TabTypes[number];

interface TabStateConfig {
	id: TabType;
	name: string;
	component: Component;
	isUnlocked?: () => boolean
}

export class TabState {
	readonly config: TabStateConfig;
	constructor(config: TabStateConfig) {
		this.config = config;
	}

	get id() { return this.config.id; }
	get name() { return this.config.name; }
	get component() { return this.config.component; }

	get isUnlocked() {
		return this.config.isUnlocked?.() ?? true;
	}

	get isCurrent() {
		return player.currentTab === this.id;
	}

	setCurrent() {
		if (!this.isUnlocked) return;
		player.currentTab = this.id;
	}
}

export const Tabs = {
	antimatter: new TabState({
		id: "antimatter",
		name: "Antimatter",
		component: AntimatterTab
	}),
	strikes: new TabState({
		id: "strikes",
		name: "Strikes",
		component: StrikesTab
	}),
	dilation: new TabState({
		id: "dilation",
		name: "Dilation",
		component: DilationTab,
		isUnlocked: () => TimeDilationHandler.isUnlocked
	}),
	glyphs: new TabState({
		id: "glyphs",
		name: "Glyphs",
		component: GlyphTab,
		isUnlocked: () => GlyphHandler.isUnlocked
	}),
} as Record<TabType, TabState>;

export function Tab(id: TabType | "current") {
	// No, player.currentTab isn't `any` you bimbo
	// @typescript-eslint/no-unsafe-member-access
	if (id === "current") return Tabs[player.currentTab];
	return Tabs[id];
}