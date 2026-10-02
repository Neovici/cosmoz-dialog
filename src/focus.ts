export const deepActiveElement = () => {
	let el = document.activeElement;
	while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
	return el as HTMLElement | null;
};
