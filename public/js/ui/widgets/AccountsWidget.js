/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
      this.update();
    } else {
      throw new Error("No element, bro!");
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createButton = this.element.querySelector(".create-account");

    createButton.addEventListener("click", function () {
      App.getModal("createAccount").open();
    });

    this.element.addEventListener("click", (e) => {
      if (e.target) {
        e.preventDefault();
        this.onSelectAccount(e);
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      Account.list({}, (err, response) => {
        this.clear();
        if (response) {
          response.data.forEach((item) => {
            this.renderItem(item);
          });
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let itemsToDelete = Array.from(this.element.querySelectorAll(".account"));
    itemsToDelete.forEach((item) => item.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(e) {
    if (this.element.querySelector(".active")) {
      this.element.querySelector(".active").classList.remove("active");
    }
    if (e.target.closest(".account")) {
      e.target.closest(".account").classList.add("active");
      App.showPage("transactions", {
        account_id: e.target.closest(".account").dataset.id,
      });
    }
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    return `
        <li class="account" data-id="${item.id}">
          <a href="#">
            <span>${item.name}</span> /
            <span>${item.sum} ₽</span>
          </a>
        </li>
      `;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data) {
    this.element.insertAdjacentHTML("beforeend", this.getAccountHTML(data));
  }
}
