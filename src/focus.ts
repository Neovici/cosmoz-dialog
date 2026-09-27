export const deepActiveElement = () => {
	let el = document.activeElement;
	while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
	return el as HTMLElement | null;
};

const children = (node: Element | ShadowRoot): Element[] => {
	if (node instanceof HTMLSlotElement) {
		return node.assignedElements({ flatten: true });
	}
	return [...((node instanceof Element && node.shadowRoot) || node).children];
};

const isTabbable = (el: Element): el is HTMLElement =>
	el instanceof HTMLElement &&
	el.tabIndex >= 0 &&
	!(el as HTMLButtonElement).disabled &&
	!el.closest('[inert]') &&
	el.checkVisibility();

/** First element in the flat tree (through shadow roots and slots) that Tab would reach. */
export const firstTabbable = (
	root: Element | ShadowRoot
): HTMLElement | undefined => {
	for (const child of children(root)) {
		if (isTabbable(child)) return child;
		const found = firstTabbable(child);
		if (found) return found;
	}
};
