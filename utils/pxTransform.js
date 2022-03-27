function getSystemSize() {
	let systemSize = {};
	uni.getSystemInfo({
		success(e) {
			systemSize = {
				windowWidth: e.windowWidth,
				windowHeight: e.windowHeight
			};
		}
	});
	return systemSize;
};

function pxToVh(px) {
	const systemSize = getSystemSize();
	return px * (100 / systemSize.windowHeight);
};

function pxToVw(px) {
	const systemSize = getSystemSize();
	return px * (100 / systemSize.windowWidth);
};

export default {
	pxToVh,
	pxToVw
};