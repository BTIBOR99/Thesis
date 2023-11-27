sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Popup",
	"sap/ui/model/json/JSONModel",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/library",
	"sap/m/List",
	"sap/m/StandardListItem",
    "sap/ui/core/Fragment",
	"sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	Popup,
	JSONModel,
	Dialog,
	Button,
	library,
	List,
	StandardListItem,
	Fragment,
	MessageBox) {
        "use strict";

        return Controller.extend("Thesis.thesis.controller.Login", {
            onInit: function () {
                
            },
           
            onDialogPress:function () {
                if (!this._uDialog) {
                    this._uDialog = this.loadFragment({
                        name: "Thesis.thesis.view.Registration"
                    });
                }
                this._uDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            onCloseDialog:function(){
               this.getView().byId("idRegistrationNickNameInput").setValue("");
               this.getView().byId("idRegistrationEmailInput").setValue("");
               this.getView().byId("idRegistrationPasswordInput").setValue("");
               this.getView().byId("idRegistrationPasswordInput2").setValue("");
               this.byId("Dialog").close(); 
            
            },
            RegistrationInputValidition: function(input){
             const isAlpha = str => /^[a-zA-Z]*$/.test(str);
             this.nickNameBoolean = Boolean(false)
             this.nickName = this.getView().byId("idRegistrationNickNameInput").getValue();
             var mailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
             this.email = this.getView().byId("idRegistrationEmailInput").getValue();
             this.password= this.getView().byId("idRegistrationPasswordInput").getValue();
             this.password2= this.getView().byId("idRegistrationPasswordInput2").getValue();
            if (this.nickName.length == 0 ) {
                MessageBox.alert("Adjon meg Felhasználó nevet");
            }
            if (!isAlpha(this.nickName)) {
                MessageBox.alert("Nem tartalmazhat számot vagy speciális karaktert");
                this.getView().byId("idRegistrationNickNameInput").setValue("");
            } 
            if(this.password.length > 20){
                MessageBox.alert("Nem lehet 20 karakternél hosszabb a jelszó");
                this.getView().byId("idRegistrationPasswordInput").setValue("");
            }
            if(this.password2.length > 20){
                    MessageBox.alert("Nem lehet 20 karakternél hosszabb a jelszó");
                    this.getView().byId("idRegistrationPasswordInput2").setValue("");
                }    
                if(this.password != this.password2){
                    this.passwordMatch = Boolean(false);
                
                //   MessageBox.alert("Nem egyeztek a jelszavak")
                //    this.getView().byId("idRegistrationPasswordInput").setValue("");
                //    this.getView().byId("idRegistrationPasswordInput2").setValue("");
                }
                else{
                    this.passwordMatch = true;
                }
            if (input.value.match(mailregex)) {
                MessageBox.alert("Valid email");
            }
            else{
                MessageBox.alert(" is not a valid email address");
            }
              // var emailAdresscheck = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
             //   this.emailAdress = this.getView().byId("idRegistrationEmailInput").getValue();
             //   if(this.emailAdress !== emailAdresscheck){
             //       MessageBox.alert("AD");
             //   }
                //this.emailAdress = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
          //  if (!oEvent.match(emailAdress)) {
                //throw new ValidateException("'" + oEvent + "' Nem valid e-mail cím");
              },

            onSaveData: function(){
                if(this.passwordMatch === false){
                    MessageBox.alert("Nem egyeztek a jelszavak");
                    return;
                }
                var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/Z_THESIS_BM_SRV/");
                var oEntry = {};
                oEntry.Username  = this.nickName;                
                oEntry.Password  = this.password;
                oEntry.Email = this.email;


                oModel.create("/UserSet", oEntry, {
                    method: "POST",
                    success: function(data){
                        MessageBox.alert("Sikeres mentés");
                    },
                    error: function(e) {
                MessageBox.alert("Ilyen felhaszáló vagy e-mail már létezik");
                    }
                });
                this.onCloseDialog();  
            }
            
        });
            
    });
