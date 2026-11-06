import { TemplateResult } from 'lit-html';

export interface Props {
	heading?: string;
	subtitle?: string;
	icon?: TemplateResult;
	onClose?: () => void;
	unmovable?: boolean;
	closeable?: boolean;
	/** Escape doesn't close the dialog. */
	uncancelable?: boolean;
}

export type DialogElement = HTMLElement & Props;
