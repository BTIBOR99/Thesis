sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(
	Controller,
	Filter,
	FilterOperator
) {
	"use strict";

	return Controller.extend("Thesis.thesis.controller.Main", {
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
           
            this.oRouter.getRoute("Main").attachMatched(this.onRouteMatched, this);         
        },
        onRouteMatched: function(oEvent){
            var username = localStorage.getItem("Username");
            if (username === 'admin') {
                this.getView().byId("btnDeleteReservation").setVisible(true);
                this.getView().byId("idCreateReservation").setVisible(true);
            } else {
                this.getView().byId("btnDeleteReservation").setVisible(false);
                this.getView().byId("idCreateReservation").setVisible(false);
            }
            this.getAccomodationList();
        },
        getAccomodationList: function (){
            this.oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_THESIS_BM_SRV/");
            this.oModel.read("AccomodationSet", {
                success: function(oData) {
                    this.AccomodationModel = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().setModel(this.AccomodationModel, "AccomodationModel");
                }.bind(this),
                error : function (oError){}
            })
        },

        onList: function (){            
            this.oRouter.navTo("Bookings");
         //   localStorage.setItem("Username", username);
        },
        onSearch: function (oEvent) {
            var aFilterSearch = [];
            var FilterArray = [...this.aFilterSearch || []];
			var oList = this.byId("idFlexBox");
			var oBinding = oList.getBinding("items");
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
                var filters = new Filter({
                    filters: [
                        new Filter("Name", FilterOperator.Contains,sQuery),
                        new Filter("City", FilterOperator.Contains,sQuery),
                        new Filter("Price", FilterOperator.Contains,sQuery),
                        new Filter("Description", FilterOperator.Contains,sQuery)
                    ],
                    and: false,
                  });
				aFilterSearch.push([filters]);
			}

            FilterArray = [...aFilterSearch || []];
	        oBinding.filter(FilterArray, "Application");
            this.aFilterSearch = aFilterSearch;
		},

        onExit: function(){
            localStorage.removeItem("Username");
            localStorage.clear();
            this.oRouter.navTo("Login", {},{},true);
        },

		onReservation: function(oEvent) {
            debugger;
            var fields = oEvent.mParameters.id.split('-');
            var realid = parseInt(fields[10])+1;
            this.oRouter.navTo("AccomodationReservation", {Tab_index: realid});
		},
        onDeleteReservation : function(oEvent){
            debugger;
            var fields = oEvent.mParameters.id.split('-');
            var realid = parseInt(fields[18])+1;
            this.oModel.remove("AccomodationSet('" + realid + "')", {
                success: function(oData) {
                    window.location.reload();
                }
            })
        },
        onNavigationCreate : function (){
            this.oRouter.navTo("AccomodationCreate", {},{},true);
        }
	});
});