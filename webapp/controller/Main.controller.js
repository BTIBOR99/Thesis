sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("Thesis.thesis.controller.Main", {
        onInit: function () {
            this.getAccomodationList();
        },
        getAccomodationList: function(){
            var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_THESIS_BM_SRV/");
            oModel.read("AccomodationSet", {
                succes: function(oData, response) {
                    var AccomodationModel = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().setModel(AccomodationModel, "AccomodationModel");
                }.bind(this),
                error : function (oError){}
            })
        },

        onSearch: function (event) {
			if (event.getParameter("searchButtonPressed")) {
				MessageToast.show("'search' event fired with 'searchButtonPressed' parameter");
			}
		}
	});
});