import { useHost } from '@neovici/cosmoz-utils/hooks/use-host';
import { useCallback, useEffect } from '@pionjs/pion';
import type { DialogElement } from './types';

export default () => {
	const host = useHost<DialogElement>();
	const close = useCallback(() => {
		host.dispatchEvent(new Event('close'));
		host.onClose?.();
	}, []);
	useEffect(() => {
		const root = host.shadowRoot;
		if (!root) return;
		const onClick = (e: MouseEvent) =>
			(e.target as HTMLButtonElement).value === 'cancel' && close();
		root.addEventListener('click', onClick as EventListener);
		return () => {
			root.removeEventListener('click', onClick as EventListener);
		};
	}, []);
	return { close };
};
