import { renderHook } from '@neovici/testing';
import { assert as sinonAssert, spy } from 'sinon';
import type { DialogElement } from '../types';
import useClose from '../use-close';

describe('use-close', () => {
	it('close dispatches close event', async () => {
		const { result, host } = await renderHook(useClose);
		const closeSpy = spy();
		host.addEventListener('close', closeSpy);
		result.current.close();
		sinonAssert.calledOnce(closeSpy);
	});

	it('close invokes onClose callback from host', async () => {
		const onCloseSpy = spy();
		const { result, host } = await renderHook(useClose);
		(host as DialogElement).onClose = onCloseSpy;
		result.current.close();
		sinonAssert.calledOnce(onCloseSpy);
	});
});
