export abstract class Effect<C, E = number> {
	readonly config: C;
	constructor(config: C) {
		this.config = config;
	}

	abstract get canApply(): boolean;
	abstract get effect(): E;

	effectOrDefault(def: E) {
		return this.canApply ? this.effect : def;
	}
}

export abstract class BuyableState<C, E = number> extends Effect<C, E> {
	abstract get cost(): number;

	abstract get currencyAmount(): number;
	abstract set currencyAmount(v: number);

	get isPurchaseable() { return true; }
	get canAfford() { return this.currencyAmount >= this.cost && this.isPurchaseable; }

	abstract handlePurchase(): void;
	buy() {
		if (!this.canAfford) return;
		this.currencyAmount -= this.cost;
		this.handlePurchase();
	}
}

export abstract class RebuyableState<C, E = number> extends BuyableState<C, E> {
	get canApply() { return true; }

	abstract get amount(): number;
	abstract set amount(v: number);

	handlePurchase() {
		this.amount++;
	}
}