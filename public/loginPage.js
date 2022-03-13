"use strict";
let loginObj = new UserForm();

loginObj.loginFormCallback = function(data) {
  ApiConnector.login(data, response =>{
    console.log(response);
  if (response.success) {
    location.reload();
  } else {
    loginObj.setLoginErrorMessage(`Пользователь c логином ${data.login} и указанным паролем не найден`);
  }
});
};

loginObj.registerFormCallback = function(data) {
  ApiConnector.register(data, response => {
    if (response.success) {
      location.reload();
    } else {
      loginObj.setRegisterErrorMessage(`Логин ${data.login} уже существует.`);
    }
  })
}
