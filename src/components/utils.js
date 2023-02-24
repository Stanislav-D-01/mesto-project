export function renderLoading(textLoading, testStandart, buttonStatus, button) {
  if (buttonStatus) {
    button.textContent = textLoading;
  } else {
    button.textContent = testStandart;
  }
}
