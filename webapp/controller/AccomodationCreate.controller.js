sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
	
], function(
	Controller, MessageBox, MessageToast
) {
	"use strict";

	return Controller.extend("Thesis.thesis.controller.AccomodationCreate", {
	onInit : function(){
		this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
	},

	handleSelectFile: function (oEvent) {
		var that = this;
		var oView = that.getView();
		var oModel = oView.getModel();
		var spath = that.getView().getModel().getData(that.getView().getBindingContext().getPath()).ObjectID;
		var fileDetails = oEvent.getParameters("file").files[0];
		sap.ui.getCore().fileUploadArr = [];
		if (fileDetails) {
		 var mimeDet = fileDetails.type,
		  fileName = fileDetails.name;
		 this.base64coonversionMethod(mimeDet, fileName, fileDetails, "001")
		} else {
		 sap.ui.getCore().fileUploadArr = [];
		}
		this.byId("myFileUpload").setValue("");
	   },
	   
	onCreate: function(){
		this.AccomodationName = this.getView().byId("idAccomodationNameInput").getValue();
		this.AccomodationPlace = this.getView().byId("idAccomodationPlaceInput").getValue();
		this.Cost = this.getView().byId("idAccomodationCostInput").getValue();
		this.Description = this.getView().byId("idAccomodationDescriptionInput").getValue();
		this.DateFrom = this.getView().byId("idDp1").getValue();
		this.DateTo = this.getView().byId("idDp2").getValue();
		
		


		  var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_THESIS_BM_SRV/");
		  var oEntry = {};
		  oEntry.Name = this.AccomodationName;
		  oEntry.City = this.AccomodationPlace;
		  oEntry.Price = this.Cost;
		  oEntry.Description = this.Description;
		  oEntry.DateFrom  = this.DateFrom;
		  oEntry.DateTo  = this.DateTo;
  
		  oModel.create("/AccomodationSet", oEntry, {
			method: "POST",
			success: function (data) {
			  MessageBox.information("Sikeres mentés");
			 
			},
			error: function (e) {
			  MessageBox.alert("Nem volt sikeres a mentés");
			},
        });
		this.oRouter.navTo("Main");
		},
		onExitCreate: function(){
			this.oRouter.navTo("Main");
		}
	});
	}
);
