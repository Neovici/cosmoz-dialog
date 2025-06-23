import { useEffect } from '@pionjs/pion';
import type {
	DialogRef,
	DialogHookResult,
	DialogProps,
	DialogCloseReason,
} from '../types';
import useClose from './use-close';
import useMove from './use-move';
import useFocus from './use-focus';

const GLOBAL_CLOSE_EVENT = 'cosmoz-dialog-next-closeall';

export default function useDialog(
	dialogRef: DialogRef,
	props: DialogProps & { open?: boolean },
	host: HTMLElement,
): DialogHookResult {
	const {
		open: isOpen = false,
		onClose,
		unmovable,
		manualFocus,
		closeable,
	} = props;

	const handleClose = (closeReason: DialogCloseReason = 'close') => {
		if (host) {
			host.setAttribute('reason', closeReason);
		}

		const dialog = dialogRef.current;
		if (dialog) {
			dialog.setAttribute('data-close-handled', 'true');
		}

		onClose?.(closeReason);
	};

	const { close } = useClose(dialogRef, handleClose, closeable);

	useMove(dialogRef, unmovable);
	useFocus(dialogRef, manualFocus);

	useEffect(() => {
		const handleSlotClick = (event: Event) => {
			const target = event.target as HTMLElement;
			if (!target) return;

			const confirmButton = target.closest('[dialog-confirm]');
			const dismissButton = target.closest('[dialog-dismiss]');

			if (confirmButton) {
				host.dispatchEvent(
					new CustomEvent('dialog-confirm', {
						bubbles: true,
						composed: true,
						detail: {},
					}),
				);
				close('confirm');
			} else if (dismissButton) {
				host.dispatchEvent(
					new CustomEvent('dialog-cancel', {
						bubbles: true,
						composed: true,
					}),
				);
				close('cancel');
			}
		};

		host.addEventListener('click', handleSlotClick);

		return () => {
			host.removeEventListener('click', handleSlotClick);
		};
	}, [host, close]);

	useEffect(() => {
		const dialog = dialogRef.current;

		if (!dialog) {
			return;
		}

		if (isOpen && !dialog.open) {
			dialog.showModal();
		} else if (!isOpen && dialog.open) {
			dialog.close();
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				if (closeable === false) {
					event.preventDefault();
				} else {
					event.preventDefault();
					close('cancel');
				}
			}
		};

		const handleCancel = (event: Event) => {
			if (closeable === false) {
				event.preventDefault();
			}
		};

		dialog.addEventListener('cancel', handleCancel);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			dialog.removeEventListener('cancel', handleCancel);
		};
	}, [isOpen, dialogRef, closeable, close, host]);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) {
			return;
		}

		const onNativeClose = () => {
			host.removeAttribute('open');
		};

		dialog.addEventListener('close', onNativeClose);
		return () => dialog.removeEventListener('close', onNativeClose);
	}, [dialogRef, host]);

	useEffect(() => {
		const handleGlobalClose = () => {
			if (dialogRef.current?.open) {
				close('close');
			}
		};

		window.addEventListener(GLOBAL_CLOSE_EVENT, handleGlobalClose);
		return () =>
			window.removeEventListener(GLOBAL_CLOSE_EVENT, handleGlobalClose);
	}, [dialogRef, close]);

	return {
		open: () => {
			const dialog = dialogRef.current;
			if (dialog && !dialog.open) {
				dialog.showModal();
			}
		},
		close,
	};
}
