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
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("AccomodationReservation").attachMatched(this.onRouteMatched, this);
        },
		onRouteMatched: function(oEvent){
		    var realid = oEvent.getParameter('arguments').id;	
			var filters = new Filter({
				filters: [
				  new Filter("Id", "EQ", realid),
				],
				and: true,
			  });
			this.oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_THESIS_BM_SRV/");
			this.oModel.read("AccomodationSet", {
				filters: [filters],
				success: function(oData) {
				// this.AccomodationModel = new sap.ui.model.json.JSONModel(oData.results);
				// this.getView().setModel(this.AccomodationModel, "Accomodation")
				this.getView().byId("idAccomodationName").setValue(oData.results[0].Name);
				this.getView().byId("idAccomodationPlace").setValue(oData.results[0].City);
				this.getView().byId("idAccomodationDescription").setValue(oData.results[0].Description);
				this.getView().byId("idAccomodationPrice").setValue(oData.results[0].Price)
				this.getView().byId("idAccomodationDateFrom").setValue(oData.results[0].DateFrom)
				this.getView().byId("idAccomodationDateTo").setValue(oData.results[0].DateTo)
				}.bind(this),
				error: function (oError) {
					sap.m.MessageToast.show("Error");
				}
			});
		},

		BillingDataValidition : function(input){
			debugger;
			this.dateFrom = this.getView().byId("idDpReservation1").getValue();
			this.dateTo = this.getView().byId("idDpReservation2").getValue();
			this.person = this.getView().byId("idPersonNumberInput").getValue();
			this.personName = this.getView().byId("idPersonNameInput").getValue();
			this.zip = this.getView().byId("idZIPInput").getValue();
			this.city = this.getView().byId("idCityInput").getValue();
			this.street = this.getView().byId("idStreetInput").getValue();

			//validation check

			const isAlpha = (str) => /^[a-zA-Z]*$/.test(str);
			const isNumber = (str) => /[0-9]+$/.test(str);
			if (!isNumber(this.person)) {
				MessageBox.alert("Csak számot tartalmazhat");
				this.getView().byId("idPersonNumberInput").setValue("");
			  }
			if (!isAlpha(this.personName)) {
				MessageBox.alert("Nem tartalmazhat számot vagy speciális karaktert");
				this.getView().byId("idPersonNameInput").setValue("");
			  }		
			if (!isNumber(this.zip)) {
				MessageBox.alert("Csak számot tartalmazhat");
				this.getView().byId("idZIPInput").setValue("");
			  }
			if (!isAlpha(this.city)) {
				MessageBox.alert("Nem tartalmazhat számot vagy speciális karaktert");
				this.getView().byId("idCityInput").setValue("");
			  }
		},
		onReservationFinish : function(){	
			debugger;
			var oEntry = {};
			oEntry.DateFrom = this.dateFrom;
			oEntry.DateTo = this.dateTo
			oEntry.Guests= this.person;
			oEntry.InvoName = this.personName;
			oEntry.InvoZip = this.zip;
			oEntry.InvoCity = this.city;
			oEntry.InvoStNo = this.street;
			this.oModel.create("BookingSet", oEntry, {
				method: "POST",
          success: function (data) {
            MessageBox.alert("Sikeres Foglalás");
			this.oRouter.navTo("Main");
          },
          error: function (e) {
            MessageBox.alert("Sikertelen foglalás");
          }
		})
		},
		onExitReservation : function(){
			this.oRouter.navTo("Main");
		}
	});
});