import { useHost } from '@neovici/cosmoz-utils/hooks/use-host';
import { useEffect } from '@pionjs/pion';

import relocate from './relocate';
import { narrow } from './style.css';
import type { DialogElement } from './types';

export default () => {
	const host = useHost<DialogElement>(),
		{ unmovable, sheet } = host;
	useEffect(() => {
		if (unmovable) {
			return;
		}

		const root = host.shadowRoot;
		if (!root) return;
		const dlg = root.querySelector('dialog');
		if (!dlg) return;
		const move = relocate(dlg, '.title'),
			// a docked sheet stays put; it only moves where it floats
			onDown = (e: MouseEvent) => {
				if (sheet && matchMedia(narrow).matches) return;
				move(e);
			};

		root.addEventListener('mousedown', onDown as EventListener);
		return () => root.removeEventListener('mousedown', onDown as EventListener);
	}, [unmovable, sheet]);
};
