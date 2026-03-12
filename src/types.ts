export interface Props {
	onClose?: () => void;
	unmovable?: boolean;
	closeable?: boolean;
}

export type DialogElement = HTMLElement & Props;
