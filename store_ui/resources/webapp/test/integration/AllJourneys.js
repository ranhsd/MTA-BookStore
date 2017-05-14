jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

// We cannot provide stable mock data out of the template.
// If you introduce mock data, by adding .json files in your webapp/localService/mockdata folder you have to provide the following minimum data:
// * At least 3 Author in the list
// * All 3 Author have at least one books

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
		"com/sap/demo/test/integration/MasterJourney",
		"com/sap/demo/test/integration/NavigationJourney",
		"com/sap/demo/test/integration/NotFoundJourney",
		"com/sap/demo/test/integration/BusyJourney"
	], function () {
		QUnit.start();
	});
});