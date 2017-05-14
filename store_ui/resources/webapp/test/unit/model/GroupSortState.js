sap.ui.define([
		"com/sap/demo/model/GroupSortState",
		"sap/ui/model/json/JSONModel"
	], function (GroupSortState, JSONModel) {
	"use strict";

	QUnit.module("GroupSortState - grouping and sorting", {
		beforeEach: function () {
			this.oModel = new JSONModel({});
			// System under test
			this.oGroupSortState = new GroupSortState(this.oModel, function() {});
		}
	});

	QUnit.test("Should always return a sorter when sorting", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.sort("numberOfBooks").length, 1, "The sorting by numberOfBooks returned a sorter");
		assert.strictEqual(this.oGroupSortState.sort("authorName").length, 1, "The sorting by authorName returned a sorter");
	});

	QUnit.test("Should return a grouper when grouping", function (assert) {
		// Act + Assert
		assert.strictEqual(this.oGroupSortState.group("numberOfBooks").length, 1, "The group by numberOfBooks returned a sorter");
		assert.strictEqual(this.oGroupSortState.group("None").length, 0, "The sorting by None returned no sorter");
	});


	QUnit.test("Should set the sorting to numberOfBooks if the user groupes by numberOfBooks", function (assert) {
		// Act + Assert
		this.oGroupSortState.group("numberOfBooks");
		assert.strictEqual(this.oModel.getProperty("/sortBy"), "numberOfBooks", "The sorting is the same as the grouping");
	});

	QUnit.test("Should set the grouping to None if the user sorts by authorName and there was a grouping before", function (assert) {
		// Arrange
		this.oModel.setProperty("/groupBy", "numberOfBooks");

		this.oGroupSortState.sort("authorName");

		// Assert
		assert.strictEqual(this.oModel.getProperty("/groupBy"), "None", "The grouping got reset");
	});
});