sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter"
], function(
	Controller,
	Filter
) {
	"use strict";

	return Controller.extend("Thesis.thesis.controller.AccomodationReservation", {
		onInit: function () {
			// sap.getRouterInfo().getRoute('AccomodationReservation').attachPatternMatched(this.onRouteMatched,this);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("AccomodationReservation").attachMatched(this.onRouteMatched, this);
        },
		onRouteMatched: function(oEvent){
		    var realid = oEvent.getParameter('arguments').id;
			var filters = new Filter({
				filters: [
				  new Filter("Id", "EQ", realid),
				],
				and: true,
			  });
			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_THESIS_BM_SRV/");
			oModel.read("AccomodationSet", {
				filters: [filters],
				success: function(oData) {
				this.AccomodationModel = new sap.ui.model.json.JSONModel(oData.results);
				this.getView().setModel(this.AccomodationModel, "Accomodation");
				}.bind(this),
				error: function (oError) {
					sap.m.MessageToast.show("Error");
				}
			});
		},
	});
});