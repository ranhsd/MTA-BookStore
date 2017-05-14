jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"com/sap/demo/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/sap/demo/test/integration/pages/App",
	"com/sap/demo/test/integration/pages/Browser",
	"com/sap/demo/test/integration/pages/Master",
	"com/sap/demo/test/integration/pages/Detail",
	"com/sap/demo/test/integration/pages/NotFound"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.sap.demo.view."
	});

	sap.ui.require([
		"com/sap/demo/test/integration/NavigationJourneyPhone",
		"com/sap/demo/test/integration/NotFoundJourneyPhone",
		"com/sap/demo/test/integration/BusyJourneyPhone"
	], function () {
		QUnit.start();
	});
});