"use strict";
let logOut = new LogoutButton();
logOut.action = function() {
  ApiConnector.logout(request => {
    if (request.success) {
      location.reload();
    }
  });
}

ApiConnector.current(check => {
  if (check.success) {
    return ProfileWidget.showProfile(check.data);
  } else {
    console.error;
  }
});

let rateBoard = new RatesBoard();
let refreshRatesBoard = function() {
  ApiConnector.getStocks(request => {
    if (request.success) {
      rateBoard.clearTable();
      rateBoard.fillTable(request.data);
    }
  })
};

refreshRatesBoard();
setInterval(() => refreshRatesBoard(), 60000);

let money = new MoneyManager();
money.addMoneyCallback = function(data) {
  ApiConnector.addMoney(data, request => {
    if (request.success) {
      ProfileWidget.showProfile(request.data);
      money.setMessage(true, `Баланс пополнен на ${data.amount}`)
    } else {
      money.setMessage(false, request.error)
    }
  })
};

money.conversionMoneyCallback = function(data) {
  ApiConnector.convertMoney(data, request => {
    if (request.success) {
      ProfileWidget.showProfile(request.data);
      money.setMessage(true, `Конвертация прошла успешно`)
    } else {
      money.setMessage(false, request.error)
    }
  })
};

money.sendMoneyCallback = function(data) {
  ApiConnector.transferMoney(data, request => {
    if (request.success) {
      ProfileWidget.showProfile(request.data);
      money.setMessage(true, `Перевод прошел успешно`)
    } else {
      money.setMessage(false, request.error)
    }
  })
};

let favoritWidget = new FavoritesWidget();

ApiConnector.getFavorites(request => {
  if (request.success) {
    favoritWidget.clearTable();
    favoritWidget.fillTable(request.data);
    money.updateUsersList(request.data);
  }
});

favoritWidget.addUserCallback = function(data) {
  ApiConnector.addUserToFavorites(data, request => {
    if (request.success) {
      favoritWidget.clearTable();
      favoritWidget.fillTable(request.data);
      money.updateUsersList(request.data);
      favoritWidget.setMessage(true, `Добавление прошло успешно`)
    } else {
      favoritWidget.setMessage(false, request.error)
    }
  })
};

favoritWidget.removeUserCallback = function(data) {
  ApiConnector.removeUserFromFavorites(data, request => {
    if (request.success) {
      favoritWidget.clearTable();
      favoritWidget.fillTable(request.data);
      money.updateUsersList(request.data);
      favoritWidget.setMessage(true, `Удаление прошло успешно`)
    } else {
      favoritWidget.setMessage(false, request.error)
    }
  })
};
