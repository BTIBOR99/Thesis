sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
	
], function(
	Controller, MessageBox
) {
	"use strict";

	return Controller.extend("Thesis.thesis.controller.AccomodationCreate", {

	onCreate: function(){
		this.AccomodationName = this.getView().byId("idAccomodationNameInput").getValue();
		this.AccomodationPlace = this.getView().byId("idAccomodationPlaceInput").getValue();
		this.Cost = this.getView().byId("idAccomodationCostInput").getValue();
		this.Description = this.getView().byId("idAccomodationDescriptionInput").getValue();
		this.DateFrom = this.getView().byId("idDp1").getValue();
		this.DateTo = this.getView().byId("idDp2").getValue();

		  var oModel = new sap.ui.model.odata.ODataModel(
			"/sap/opu/odata/sap/Z_THESIS_BM_SRV/"
		  );
		  var oEntry = {};
		  oEntry.Name = this.AccomodationName;
		  oEntry.City = this.AccomodationPlace;
		  oEntry.Price = this.Cost;
		  oEntry.Description = this.Description;
		  oEntry.DateFrom  = this.DateFrom;
		  oEntry.DateTo  = this.DateTo;
  
		  oModel.create("/AccomodationSet", oEntry, {
			method: "POST",
			success: function (data) {
			  MessageBox.alert("Sikeres mentés");
			},
			error: function (e) {
			  MessageBox.alert("Ilyen felhaszáló vagy e-mail már létezik");
			},
        });
		},
		onExitCreate: function(){
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Main");
		}
	});
	}
);
