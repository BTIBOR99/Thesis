sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(
	Controller,
	Filter,
	MessageBox,
	JSONModel,
	MessageToast
	) {
	"use strict";

	return Controller.extend("Thesis.thesis.controller.AccomodationReservation", {
		onInit: function () {
			this.staticValuesOdata();
			this.userName = localStorage.getItem("Username");
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
		
		staticValuesOdata : function (){
			var oData = {
				"PaymentCollection": [
					{
						"PaymentId": "0",
						"PaymentType": "Készpénz",
						"Icon": "sap-icon://money-bills",
					},
					{
						"PaymentId": "1",
						"PaymentType": "Kártya",
						"Icon": "sap-icon://credit-card",
					},
				]
			}
			var StaticModel = new JSONModel(oData);
			this.getView().byId("idPaymentSelect").setModel(StaticModel,'StaticModel');
		},

		BillingDataValidition : function(input){
			debugger;
			this.dateFrom = this.getView().byId("idDpReservation1").getValue();
			this.dateTo = this.getView().byId("idDpReservation2").getValue();
			this.person = this.getView().byId("idPersonNumberInput").getValue();	
			this.personName = this.getView().byId("idPersonNameInput").getValue();	
			this.city = this.getView().byId("idCityInput").getValue();
			this.zip = this.getView().byId("idZIPInput").getValue();

			this.payment = this.getView().byId("idPaymentSelect").getValue();
			this.street = this.getView().byId("idStreetInput").getValue();

			const isAlpha = (str) => /^[a-zA-Z]*$/.test(str);
			const isNumber = (str) => /^\d+$/.test(str);
			debugger;
			if (!isNumber(this.person)&& this.person.length > 0) {
				MessageBox.alert("Csak számot tartalmazhat");
			  }
			if (!isAlpha(this.personName) ) {
				MessageBox.alert("Nem tartalmazhat számot vagy speciális karaktert");
			  }		
			if (!isNumber(this.zip) && this.zip.length > 0) {
				MessageBox.alert("Csak számot tartalmazhat");
			  }	
			if (!isAlpha(this.city)) {
				MessageBox.alert("Nem tartalmazhat számot vagy speciális karaktert");
			  }
		},
		onReservationFinish : function(){	
			debugger;
			//Foglalás ára
			var finalDays = this.dateTo - this.dateFrom;
			var finalPrice = this.getView().byId("idAccomodationPrice").getValue();
			var lastPrice = this.person * finalPrice * finalDays ;
			MessageBox.alert("A foglalás ára :" + lastPrice);
			
			var oEntry = {};
			oEntry.Username = this.userName;
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