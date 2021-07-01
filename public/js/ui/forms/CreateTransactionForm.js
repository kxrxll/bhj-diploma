/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountSelect = this.element.querySelector(".accounts-select");
    const options = accountSelect.querySelectorAll("option");
    if (options) {
      options.forEach((item) => item.remove());
    }
    Account.list({}, function (err, response) {
      if (response && response.data) {
        const newElemArr = [];
        response.data.forEach((item) => {
          let newElem = document.createElement("option");
          newElem.value = item.id;
          newElem.textContent = item.name;
          newElemArr.push(newElem);
        });
        newElemArr.forEach((item) => accountSelect.appendChild(item));
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response) {
        if (this.element.id === "new-income-form") {
          App.getForm("createIncome").element.reset();
          App.getModal("newIncome").close();
        } else {
          App.getForm("createExpense").element.reset();
          App.getModal("newExpense").close();
        }
        App.update();
      }
    });
  }
}
