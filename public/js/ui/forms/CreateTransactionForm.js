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
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accountSelect = this.element.querySelector('.accounts-select');
    Account.list({}, function(err, response) {
      if (response) {
       response.data.forEach(item => {
         const newElem = document.createElement('option');
         newElem.style.value = item.id;
         newElem.textContent = item.name;
         accountSelect.append(newElem);
       });
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        Array.from(document.querySelectorAll('.form')).forEach(item => item.reset());
        App.getModal('newExpense').close();
        App.getModal('newIncome').close();
        User.setCurrent(response.user.name);
        App.update();
      } else {
        console.log(response.error);
      }
      App.getModal('login').close();
    });
  }
}