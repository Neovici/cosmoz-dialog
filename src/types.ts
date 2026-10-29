import { TemplateResult } from 'lit-html';

export interface Props {
	heading?: string;
	subtitle?: string;
	icon?: TemplateResult;
	onClose?: () => void;
	unmovable?: boolean;
	closeable?: boolean;
	/** Dock to the bottom edge as a sheet on narrow viewports. */
	sheet?: boolean;
}

export type DialogElement = HTMLElement & Props;
