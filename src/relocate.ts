const defaultLimit = (bounds: DOMRect, x: number, y: number) => {
	const bw = bounds.width / 3;
	const bh = bounds.height / 3;
	const limitX = Math.min(window.innerWidth - 2 * bw, Math.max(-bw, x));
	const limitY = Math.min(window.innerHeight - 2 * bh, Math.max(-bh, y));
	return { x: limitX, y: limitY };
};

export default (
		el: HTMLElement,
		handle: string,
		limit?: (bounds: DOMRect, x: number, y: number) => { x: number; y: number },
		up?: (e: MouseEvent) => void,
	) =>
	(e: MouseEvent) => {
		if (handle && !(e.target as HTMLElement)?.closest?.(handle)) {
			return;
		}
		const limitBounds = limit || defaultLimit;
		const bounds = el.getBoundingClientRect(),
			shiftX = e.clientX - bounds.x,
			shiftY = e.clientY - bounds.y,
			move = (clientX: number, clientY: number) => {
				const x = clientX - shiftX;
				const y = clientY - shiftY;

				const limited = limitBounds(bounds, x, y);

				Object.assign(el.style, {
					left: limited.x + 'px',
					top: limited.y + 'px',
					transform: 'initial',
				});
			},
			onMove = (e: MouseEvent) => move(e.clientX, e.clientY),
			onUp = (e: MouseEvent) => {
				document.removeEventListener('mousemove', onMove);
				document.removeEventListener('mouseup', onUp);
				up?.(e);
			};
		document.addEventListener('mousemove', onMove);
		document.addEventListener('mouseup', onUp);
	};
