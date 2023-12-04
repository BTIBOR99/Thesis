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
		  var oModel = new sap.ui.model.odata.ODataModel(
			"/sap/opu/odata/sap/Z_THESIS_BM_SRV/"
		  );
		  debugger;
		  var oEntry = {};
		  oEntry.AccomodationName = this.AccomodationName;
		  oEntry.AccomodationPlace = this.AccomodationPlace;
		  oEntry.Cost = this.Cost;
		  oEntry.Description = this.Description
  
		  oModel.create("/AccomodationSet", oEntry, {
			method: "POST",
			success: function (data) {
			  MessageBox.alert("Sikeres mentés");
			},
			error: function (e) {
			  MessageBox.alert("Ilyen felhaszáló vagy e-mail már létezik");
			},
        });
		}
	});
	}
);
