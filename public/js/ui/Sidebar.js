/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const toggleButton = document.querySelector(".sidebar-toggle");
    const body = document.querySelector("body");
    toggleButton.addEventListener("click", function (e) {
      e.preventDefault();
      body.classList.toggle("sidebar-open");
      body.classList.toggle("sidebar-collapse");
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const regButton = document.querySelector(".menu-item_register");
    const loginButton = document.querySelector(".menu-item_login");
    const logoutButton = document.querySelector(".menu-item_logout");

    const modalReg = App.getModal("register");
    const modalIn = App.getModal("login");

    regButton.addEventListener("click", function (e) {
      e.preventDefault();
      modalReg.open();
    });
    loginButton.addEventListener("click", function (e) {
      e.preventDefault();
      modalIn.open();
    });
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      User.logout({}, () => {});
      App.setState("init");
    });
  }
}
