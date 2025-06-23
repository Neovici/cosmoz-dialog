export interface RefObject<T> {
	current: T | null;
}

export type DialogCloseReason = 'confirm' | 'cancel' | 'error' | 'close';

export interface FooterActions {
	confirm?: {
		text: string;
		disabled?: boolean;
	};
	cancel?: {
		text: string;
		hidden?: boolean;
	};
}

export interface DialogProps {
	onClose?: (reason?: DialogCloseReason) => void;
	unmovable?: boolean;
	closeable?: boolean;
	manualFocus?: boolean;
	title?: string;
	heading?: string;
	open?: boolean;
	defaultFooterActions?: boolean;
	footerActions?: FooterActions;
	reason?: DialogCloseReason;
	loading?: boolean;
}

export type DialogElement = HTMLElement & DialogProps;

export type DialogRef = RefObject<HTMLDialogElement>;

export interface DialogHookResult {
	open: () => void;
	close: (reason?: DialogCloseReason) => void;
}
