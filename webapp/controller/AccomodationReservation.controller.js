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

		BillingDataValidition : function(){
			this.Person = this.getView().byId("idPersonNumberInput").getValue();
			this.personName = this.getView().byId("idPersonNameInput").getValue();
			this.ZIP = this.getView().byId("idZIPInput").getValue();
			this.City = this.getView().byId("idCityInput").getValue();
			this.street = this.getView().byId("idStreetInput").getValue();
		},
		onReservationFinish : function(){	
			debugger;
			var oEntry = {};
			oEntry.InvoName = this.personName;
			oEntry.InvoZip = this.ZIP;
			oEntry.InvoCity = this.City;
			oEntry.InvoStNo = this.street;
			oEntry.Guests= this.Person;
			this.oModel.create("BookingSet", oEntry, {
				method: "POST",
          success: function (data) {
            MessageBox.alert("Sikeres Foglalás");
			this.oRouter.navTo("Main")
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