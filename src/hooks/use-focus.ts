import { useLayoutEffect } from '@pionjs/pion';
import type { DialogRef } from '../types';

export default (dialogRef: DialogRef, manualFocus?: boolean) => {
	useLayoutEffect(() => {
		if (manualFocus || !dialogRef.current) return;

		const dialog = dialogRef.current;
		const focusableEl = dialog.querySelector(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);

		if (focusableEl && !dialog.matches(':focus-within')) {
			(focusableEl as HTMLElement).focus();
		}
	}, [dialogRef, manualFocus]);
};
