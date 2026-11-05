import { TemplateResult } from "lit-html";

export interface Props {
	heading?: string;
	subtitle?: string;
	icon?: TemplateResult;
	onClose?: () => void;
	unmovable?: boolean;
	closeable?: boolean;
	/** Renders an alertdialog: for confirmations that interrupt the user. */
	alert?: boolean;
}

export type DialogElement = HTMLElement & Props;
