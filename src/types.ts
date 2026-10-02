import { TemplateResult } from 'lit-html';

export interface Props {
	heading?: string;
	subtitle?: string;
	icon?: TemplateResult;
	onClose?: () => void;
	unmovable?: boolean;
	closeable?: boolean;
	/** Escape and other close requests are ignored. */
	uncancelable?: boolean;
	/** Renders as an `alertdialog`: a confirmation that needs a response. */
	alert?: boolean;
}

export type DialogElement = HTMLElement & Props;
