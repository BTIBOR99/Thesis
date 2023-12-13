sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Thesis.thesis.controller.Main", {
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.getAccomodationList();
              debugger; 
            this.username = localStorage.getItem("Username");
            if (this.username === 'admin') {
                this.getView().byId("btnDeleteReservation").setVisible(true);
                this.getView().byId("idCreateReservation").setVisible(true);

            } else {
                this.getView().byId("btnDeleteReservation").setVisible(false);
                this.getView().byId("idCreateReservation").setVisible(false);
            }
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

        onSearch: function (event) {
			if (event.getParameter("searchButtonPressed")) {
				MessageToast.show("'search' event fired with 'searchButtonPressed' parameter");
			}
		},

        onExit: function(){
            localStorage.removeItem("Username");
            localStorage.clear();
            this.oRouter.navTo("Login", {},{},true);
        },

		onReservation: function(oEvent) {
            var fields = oEvent.mParameters.id.split('-');
            var realid = parseInt(fields[2]);
            this.oRouter.navTo("AccomodationReservation", {id: realid + 1 });
		},
        onDeleteReservation : function(){
            debugger;
            this.oModel.remove("AccomodationSet", {
                method: "DELETE" ,
                success: function() {

                },
                error : function(){}
            })
        },
        onNavigationCreate : function (){
            this.oRouter.navTo("AccomodationCreate", {},{},true);
        }
	});
});