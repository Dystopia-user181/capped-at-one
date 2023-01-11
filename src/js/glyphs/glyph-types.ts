import { GlyphUnlockHandler } from "./unlocks";

export enum GlyphType {
	antimatter,
	time,
	infinity,
}

export const GlyphTypes = {
	[GlyphType.antimatter]: {
		name: "Antimatter",
		colour: "#22aa48",
		symbol: "A",
		isUnlocked: true,
	},
	[GlyphType.time]: {
		name: "Time",
		colour: "#64dd17",
		symbol: "T",
		get isUnlocked() { return GlyphUnlockHandler.isTimeGlyphUnlocked; },
	},
	[GlyphType.infinity]: {
		name: "Infinity",
		colour: "#b67f33",
		symbol: "I",
		isUnlocked: false,
	}
};