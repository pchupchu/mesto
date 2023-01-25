class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    // ...
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: 'bc45b1d2-8184-43a4-b071-b769e584deb5',
    'Content-Type': 'application/json'
  }
});
