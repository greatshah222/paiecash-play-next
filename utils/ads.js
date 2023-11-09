function loadAds() {
	window.relevantDigital = window.relevantDigital || {};
	relevantDigital.cmd = relevantDigital.cmd || [];
	relevantDigital.cmd.push(function () {
		relevantDigital.loadPrebid({
			configId: "63ee19493a5bfe5e5de35d55", //Salibandy config id
			delayedAdserverLoading: true,
			manageAdserver: true,
			collapseEmptyDivs: true,
			collapseBeforeAdFetch: false,
			noGpt: true,
			allowedDivIds: null,
		});
	});
}

function deviceHandler() {
	var type = window.innerWidth < 980 ? "mobile" : "desktop";

	[("data-lazy-" + type + "-ad-unit-id", "data-" + type + "-ad-unit-id")].forEach(function (attr) {
		Array.from(document.querySelectorAll("[" + attr + "]")).forEach(function (elm) {
			elm.setAttribute(attr.replace(type + "-", ""), elm.getAttribute(attr));
		});
	});
}
export { loadAds, deviceHandler };
