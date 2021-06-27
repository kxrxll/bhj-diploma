/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static url = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return localStorage['user'];
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    const requestResult = createRequest({
      url: this.url + '/current',
      method: 'GET',
      responseType: 'json',
      callback: callback
    })
    if (requestResult && requestResult.success) {
      User.setCurrent(requestResult.user.name);
    } else {
      User.unsetCurrent();
    }
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
     const requestResult = createRequest({
      url: this.url + '/login',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: callback
    })
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    const requestResult = createRequest({
      url: this.url + '/register',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: callback
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {
    const requestResult = createRequest({
      url: this.url + '/logout',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: callback
    })
  }
}
