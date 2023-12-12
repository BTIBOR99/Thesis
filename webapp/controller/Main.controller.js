sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Thesis.thesis.controller.Main", {
        onInit: function () {
          
            this.getAccomodationList();
              debugger; 
            this.username = localStorage.getItem("Username");
            if (this.username === 'admin') {
                this.getView().byId("btnDeleteReservation").setVisible(true);
            } else {
                this.getView().byId("btnDeleteReservation").setVisible(false);
            }
        },

        getAccomodationList: function (){

            var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_THESIS_BM_SRV/");
            oModel.read("AccomodationSet", {
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
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            localStorage.removeItem("Username");
            localStorage.clear();
            oRouter.navTo("Login", {},{},true);
        },

		onReservation: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var fields = oEvent.mParameters.id.split('-');
            var realid = parseInt(fields[2]);
            oRouter.navTo("AccomodationReservation", {id: realid + 1 });
		},
        onDeleteReservation : function(){
    
        }
	});
});