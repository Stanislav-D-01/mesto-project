export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

export function renderLoading(textLoading, testStandart, buttonStatus, button) {
  if (buttonStatus) {
    button.textContent = textLoading;
  } else {
    button.textContent = testStandart;
  }
}
