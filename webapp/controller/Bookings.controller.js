sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter"
], function(
	Controller, Filter
) {
	"use strict";

	return Controller.extend("Thesis.thesis.controller.Bookings", {

    onInit: function(){
        this.username = localStorage.getItem("Username");
        this.getBookingsList();
    },
    getBookingsList: function (){
        var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_THESIS_BM_SRV/");
        var filters = new Filter({
            filters: [
              new Filter("Username", "EQ", this.username),
            ],
            and: true,
          });
        oModel.read("BookingSet", {
            filters: [filters],
            success: function(oData) {
                this.BookingsModel = new sap.ui.model.json.JSONModel(oData.results);
                this.getView().setModel(this.BookingsModel, "BookingsModel");
            }.bind(this),
            error : function (oError){}
        })
    },
    onBackToMain: function (){
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("Main");
    }
	});
});