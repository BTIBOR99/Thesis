sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Thesis.thesis.controller.Main", {
        onInit: function () {

            this.getAccomodationList();
            var username = localStorage.getItem("Username");
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
            oRouter.navTo("Login");
        }
	});
});