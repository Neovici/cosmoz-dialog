import { useHost } from '@neovici/cosmoz-utils/hooks/use-host';
import { useEffect } from '@pionjs/pion';

import { lock, unlock } from './scroll-lock';
import type { DialogElement } from './types';

export default () => {
	const host = useHost<DialogElement>();
	useEffect(() => {
		const root = host.shadowRoot;
		if (!root) return;
		lock();
		const onClose = () => unlock();
		root.addEventListener('close', onClose, true);
		return () => {
			root.removeEventListener('close', onClose, true);
			unlock();
		};
	}, []);
};