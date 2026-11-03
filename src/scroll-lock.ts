// Refcounts open modal dialogs and suppresses the page scroll while one is
// open, so entrance offsets below the fold cannot flash the scrollbar.
let count = 0;
let prev = '';

export const lock = () => {
	if (count++ > 0) return;
	prev = document.documentElement.style.overflow;
	document.documentElement.style.overflow = 'hidden';
};

export const unlock = () => {
	if (count === 0 || --count > 0) return;
	document.documentElement.style.overflow = prev;
};