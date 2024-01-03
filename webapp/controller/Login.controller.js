sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Popup",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/library",
    "sap/m/List",
    "sap/m/StandardListItem",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/core/routing/Router",
	"sap/m/MessageToast"
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
	Popup,
	JSONModel,
	Dialog,
	Button,
	library,
	List,
	StandardListItem,
	Fragment,
	MessageBox,
	Filter,
	Router,
	MessageToast
  ) {
    "use strict";

    return Controller.extend("Thesis.thesis.controller.Login", {
      onInit: function () {},

      onDialogPress: function () {
        if (!this._uDialog) {
          this._uDialog = this.loadFragment({
            name: "Thesis.thesis.view.Registration",
          });
        }
        this._uDialog.then(function (oDialog) {
          oDialog.open();
        });
      },

      onCloseDialog: function () {
        this.getView().byId("idRegistrationNickNameInput").setValue("");
        this.getView().byId("idRegistrationEmailInput").setValue("");
        this.getView().byId("idRegistrationPasswordInput").setValue("");
        this.getView().byId("idRegistrationPasswordInput2").setValue("");
        this.byId("Dialog").close();
      },
      RegistrationInputValidition: function () {
        const isAlpha = (str) => /^[a-zA-Z]*$/.test(str);
        this.nickNameBoolean = Boolean(false);
        this.nickName = this.getView().byId("idRegistrationNickNameInput").getValue();
        this.password = this.getView().byId("idRegistrationPasswordInput").getValue();
        this.password2 = this.getView().byId("idRegistrationPasswordInput2").getValue();
        this.email = this.getView().byId("idRegistrationEmailInput").getValue();
        
        if (!isAlpha(this.nickName)) {      
          this.getView().byId("idRegistrationNickNameInput").setValueState('Error');
          MessageToast.show("Nem tartalmazhat számot vagy speciális karaktert a Felhasználó név")
        }else{
          this.getView().byId("idRegistrationNickNameInput").setValueState('None');
        }
        if (this.password.length == 20) {
          this.getView().byId("idRegistrationPasswordInput").setValueState('Error');
          MessageToast.show("Elérte a maximális karakter számot a jelszónál")
        }else{
          this.getView().byId("idRegistrationPasswordInput").setValueState('None');
        }
        if (this.password2.length == 20) {
          this.getView().byId("idRegistrationPasswordInput2").setValueState('Error');
          MessageToast.show("Elérte a maximális karakter számot a jelszónál")
        }else{
          this.getView().byId("idRegistrationPasswordInput2").setValueState('None');
        }
      },

      onSaveData: function () {
        var emailRegex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
        if (this.nickName) {
          this.getView().byId("idRegistrationNickNameInput").setValueState('None');
        } else {
          this.getView().byId("idRegistrationNickNameInput").setValueState('Error');
          MessageToast.show("Kötelező a felhasználó név")
          return this.onDialogPress;
        }
        if (emailRegex.test(this.email)) {
          this.getView().byId("idRegistrationEmailInput").setValueState('None');
        } else {
          this.getView().byId("idRegistrationEmailInput").setValueState('Error');
          MessageToast.show("Nem valid az email cím")
          return this.onDialogPress;
        }  
        if (this.password) {
          this.getView().byId("idRegistrationPasswordInput").setValueState('None');
        }else{
          this.getView().byId("idRegistrationPasswordInput").setValueState('Error');
          MessageToast.show("Kötelező a jelszó")
          return this.onDialogPress;
        }
        if (this.password2) {
          this.getView().byId("idRegistrationPasswordInput2").setValueState('None');
        }else{
          this.getView().byId("idRegistrationPasswordInput2").setValueState('Error');
          MessageToast.show("Kötelező a jelszó")
          return this.onDialogPress;
        }
        if (this.password != this.password2) {
          MessageBox.alert("Nem egyeztek a jelszavak");
          return this.onDialogPress;
        }
        var oModel = new sap.ui.model.odata.ODataModel(
          "/sap/opu/odata/sap/Z_THESIS_BM_SRV/"
        );
        var oEntry = {};
        oEntry.Username = this.nickName;
        oEntry.Password = this.password;
        oEntry.Email = this.email;

        oModel.create("/UserSet", oEntry, {
          method: "POST",
          success: function (data) {
            MessageBox.alert("Sikeres mentés");
          },
          error: function (e) {
            MessageBox.alert("Ilyen felhaszáló vagy e-mail már létezik");
          },
        });
        this.onCloseDialog();
      },

      onPressLogin: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var oDataModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_THESIS_BM_SRV/");

        var username = this.getView().byId("nameInput").getValue();
        var password = this.getView().byId("PasswordInput").getValue();

        var filters = new Filter({
          filters: [
            new Filter("Username", "EQ", username),
            new Filter("Password", "EQ", password),
          ],
          and: true,
        });

        oDataModel.read("/UserSet", {
          filters: [filters],
          success: function () {
          //  MessageBox.alert("Log suc.");
          //  this.getView().byId("nameInput").setValue("");
          // this.getView().byId("PasswordInput").setValue("");
            oRouter.navTo("Main");
            localStorage.setItem("Username", username);
          },
          error: function (oError) {
            MessageBox.alert("Log error");
          },
        }); 
      },
    });
  }
);
