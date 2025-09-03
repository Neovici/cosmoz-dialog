import { useEffect } from '@pionjs/pion';
import type { DialogRef } from '../types';

export default (dialogRef: DialogRef, unmovable?: boolean) => {
	useEffect(() => {
		if (unmovable || !dialogRef.current) {
			return;
		}

		const dialog = dialogRef.current;
		const titleEl = dialog.querySelector('.title');
		if (!titleEl) return;

		const onDown = (e: MouseEvent) => {
			if (!(e.target as HTMLElement).closest('.title')) {
				return;
			}

			const bounds = dialog.getBoundingClientRect();
			const shiftX = e.clientX - bounds.x;
			const shiftY = e.clientY - bounds.y;

			const move = (clientX: number, clientY: number) => {
				const x = clientX - shiftX;
				const y = clientY - shiftY;

				const bw = bounds.width / 3;
				const bh = bounds.height / 3;
				const limitX = Math.min(window.innerWidth - 2 * bw, Math.max(-bw, x));
				const limitY = Math.min(window.innerHeight - 2 * bh, Math.max(-bh, y));

				// Apply the position to the dialog element
				Object.assign(dialog.style, {
					position: 'fixed',
					left: limitX + 'px',
					top: limitY + 'px',
					margin: '0',
					transform: 'none',
				});
			};

			const onMove = (e: MouseEvent) => move(e.clientX, e.clientY);
			const onUp = () => {
				document.removeEventListener('mousemove', onMove);
				document.removeEventListener('mouseup', onUp);
			};

			document.addEventListener('mousemove', onMove);
			document.addEventListener('mouseup', onUp);
		};

		titleEl.addEventListener('mousedown', onDown as EventListener);
		return () =>
			titleEl.removeEventListener('mousedown', onDown as EventListener);
	}, [dialogRef, unmovable]);
};
