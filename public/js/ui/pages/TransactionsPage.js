/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (element) {
      this.element = element;
      this.registerEvents();
    } else {
      throw new Error("No element guys!");
    }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render();
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeBtn = this.element.querySelector(".remove-account");

    removeBtn.addEventListener("click", this.removeAccount.bind(this));
    this.element.addEventListener("click", this.removeTransaction.bind(this));
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    if (window.confirm("Удаляем?")) {
      Account.remove(data, (err, response) => {
        if (response) {
          App.updateWidgets();
        }
      });
      this.clear();
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    if (id.target) {
      id = id.target.id;
    }
    if (window.confirm("Удаляем?")) {
      Transaction.remove(id, (err, response) => {
        if (response) {
          App.updateWidgets();
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (options) {
      if (this.lastOptions) {
        options = this.lastOptions;
      } else {
        this.lastOptions = options;
      }
      if (options.account_id && options) {
        Account.get(options.account_id, (err, response) => {
          if (response) {
            this.renderTitle(response.data.name);
          }
        });
      }
      Transaction.list(options, (err, response) => {
        if (response) {
          if (this.element.querySelectorAll(".transaction")) {
            Array.from(this.element.querySelectorAll(".transaction")).forEach(
              (item) => item.remove()
            );
          }
          this.renderTransactions(response.data);
        }
      });
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.element.querySelector(".content").innerHTML = "";
    this.renderTitle("Название счёта");
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    this.element.querySelector(".content-title").textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleDateString("ru-RU", options);
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    item.date = this.formatDate(new Date(Date.parse(item.created_at)));
    return `
    <div class="transaction transaction_expense row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${item.date}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">${item.sum}<span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
    </div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    const section = this.element.querySelector(".content");
    data.forEach((item) => {
      section.insertAdjacentHTML("beforeend", this.getTransactionHTML(item));
    });
  }
}
