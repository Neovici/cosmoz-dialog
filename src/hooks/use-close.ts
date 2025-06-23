import { useEffect, useCallback } from '@pionjs/pion';
import type { DialogRef, DialogCloseReason } from '../types';

export default (
	dialogRef: DialogRef,
	onClose?: (reason?: DialogCloseReason) => void,
	closeable: boolean = true,
) => {
	const close = useCallback(
		(reason: DialogCloseReason = 'close') => {
			const dialog = dialogRef.current;

			if (dialog?.open) {
				dialog.setAttribute('data-close-handled', 'true');
				dialog.close();
			}

			onClose?.(reason);
		},
		[dialogRef, onClose],
	);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		const onDialogClose = () => {
			if (!dialog.hasAttribute('data-close-handled')) {
				onClose?.('close');
			}
			dialog.removeAttribute('data-close-handled');
		};

		const onClick = (e: MouseEvent) => {
			if (!closeable) {
				return;
			}

			if (e.target === dialog && closeable) {
				close('cancel');
			}
		};

		dialog.addEventListener('close', onDialogClose);
		dialog.addEventListener('click', onClick as EventListener);

		return () => {
			dialog.removeEventListener('close', onDialogClose);
			dialog.removeEventListener('click', onClick as EventListener);
		};
	}, [dialogRef, onClose, close, closeable]);

	return { close };
};
