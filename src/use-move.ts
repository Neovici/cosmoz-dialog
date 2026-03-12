import { useHost } from '@neovici/cosmoz-utils/hooks/use-host';
import { useEffect } from '@pionjs/pion';

import relocate from './relocate';
import type { DialogElement } from './types';

export default () => {
	const host = useHost<DialogElement>(),
		{ unmovable } = host;
	useEffect(() => {
		if (unmovable) {
			return;
		}

		const root = host.shadowRoot;
		if (!root) return;
		const dlg = root.querySelector('dialog');
		if (!dlg) return;
		const onDown = relocate(dlg, '.title');

		root.addEventListener('mousedown', onDown as EventListener);
		return () => root.removeEventListener('mousedown', onDown as EventListener);
	}, [unmovable]);
};
