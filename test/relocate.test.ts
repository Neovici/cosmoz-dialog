import { assert } from '@open-wc/testing';
import relocate from '../src/relocate';

suite('dialog/relocate', () => {
	test('relocate without handle', () => {
		const el = document.createElement('div');
		Object.assign(el.style, {
			position: 'absolute',
			top: '100px',
			left: '100px',
			width: '120px',
			height: '100px',
		});
		document.body.append(el);

		const onRelocate = relocate(el, '');
		onRelocate(new MouseEvent('mousedown', { clientX: 120, clientY: 100 }));
		assert.equal(el.style.top, '100px');
		assert.equal(el.style.left, '100px');

		document.dispatchEvent(
			new MouseEvent('mousemove', { clientX: 130, clientY: 100 }),
		);
		assert.equal(el.style.top, '100px');
		assert.equal(el.style.left, '110px');
		document.dispatchEvent(new MouseEvent('mouseup'));
	});

	test('relocate with handle', () => {
		const el = document.createElement('div');
		const handle = document.createElement('div');
		handle.className = 'handle';
		el.appendChild(handle);

		Object.assign(el.style, {
			position: 'absolute',
			top: '100px',
			left: '100px',
			width: '120px',
			height: '100px',
		});
		document.body.append(el);

		const onRelocate = relocate(el, '.handle');

		// test that clicking on non-handle element doesn't trigger relocate
		const nonHandle = document.createElement('div');
		el.appendChild(nonHandle);
		onRelocate(
			new MouseEvent('mousedown', {
				clientX: 120,
				clientY: 100,
			}),
		);

		document.dispatchEvent(
			new MouseEvent('mousemove', { clientX: 130, clientY: 100 }),
		);

		// position should not change when clicking non-handle element
		assert.equal(el.style.top, '100px');
		assert.equal(el.style.left, '100px');

		// test that clicking on handle element triggers relocate
		const mouseEvent = new MouseEvent('mousedown', {
			clientX: 120,
			clientY: 100,
		});

		const mockTarget = {
			closest: (selector: string) => (selector === '.handle' ? handle : null),
		};

		Object.defineProperty(mouseEvent, 'target', {
			value: mockTarget,
			configurable: true,
		});

		onRelocate(mouseEvent);

		document.dispatchEvent(
			new MouseEvent('mousemove', { clientX: 140, clientY: 110 }),
		);

		// position should change when clicking handle element
		assert.equal(el.style.top, '110px');
		assert.equal(el.style.left, '120px');

		document.dispatchEvent(new MouseEvent('mouseup'));
	});

	// test bounds limiting
	test('relocate with bounds limiting', () => {
		const el = document.createElement('div');
		Object.assign(el.style, {
			position: 'absolute',
			top: '100px',
			left: '100px',
			width: '120px',
			height: '100px',
		});
		document.body.append(el);

		const customLimit = (bounds: DOMRect, x: number, y: number) => ({
			x: Math.min(200, Math.max(0, x)),
			y: Math.min(200, Math.max(0, y)),
		});

		const onRelocate = relocate(el, '', customLimit);
		onRelocate(new MouseEvent('mousedown', { clientX: 120, clientY: 100 }));

		// test moving beyond max bounds
		document.dispatchEvent(
			new MouseEvent('mousemove', { clientX: 300, clientY: 300 }),
		);
		assert.equal(el.style.top, '200px');
		assert.equal(el.style.left, '200px');

		// test moving beyond min bounds
		document.dispatchEvent(
			new MouseEvent('mousemove', { clientX: -100, clientY: -100 }),
		);
		assert.equal(el.style.top, '0px');
		assert.equal(el.style.left, '0px');

		document.dispatchEvent(new MouseEvent('mouseup'));
	});
});
