sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Popup",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/List",
	"sap/m/StandardListItem",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Popup, JSONModel, Dialog, Button, mobileLibrary, List, StandardListItem, Fragment) {
        "use strict";

        return Controller.extend("Thesis.thesis.controller.Login", {
            onInit: function () {

            },

            onDialogPress: function () {
                debugger;
                if (!this._uDialog) {
                    this._uDialog = this.loadFragment({
                        name: "Thesis.thesis.view.Registration"
                    });
                }
                this._uDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            onCloseDialong:function(){
                this.byId("Registration").close();
            }

        });
    });
