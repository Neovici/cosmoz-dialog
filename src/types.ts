import { TemplateResult } from 'lit-html';

export interface Props {
	heading?: string;
	title?: string;
	subtitle?: string;
	icon?: TemplateResult;
	onClose?: () => void;
	unmovable?: boolean;
	closeable?: boolean;
}

export type DialogElement = HTMLElement & Props;
