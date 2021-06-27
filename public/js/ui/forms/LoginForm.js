/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      if (response.success) {
        User.setCurrent(response.user.name);
        App.setState('user-logged');
      } else {
        console.log(response.error);
      }
      App.getModal('login').close();
      Array.from(document.querySelectorAll('.form')).forEach(item => item.reset());
    })
  }
}
