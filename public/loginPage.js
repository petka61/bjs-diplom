"use strict";
let loginObj = new UserForm();

loginObj.loginFormCallback = function(data) {
  ApiConnector.login(data, response =>{
  if (response.success) {
    location.reload();
  } else {
    loginObj.setLoginErrorMessage(response.error);

  }
});
};

loginObj.registerFormCallback = function(data) {
  ApiConnector.register(data, response => {
    if (response.success) {
      location.reload();
    } else {
      loginObj.setRegisterErrorMessage(response.error);
    }
  })
}
