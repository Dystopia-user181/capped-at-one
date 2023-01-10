export enum GlyphType {
	antimatter,
	infinity,
}

export const GlyphTypes = {
	[GlyphType.antimatter]: {
		colour: "#22aa48",
		symbol: "A",
	},
	[GlyphType.infinity]: {
		colour: "#b67f33",
		symbol: "I",
	}
};

export interface GlyphData {
	type: GlyphType,
	level: number,
	effects: number,
	rarity: number,
}