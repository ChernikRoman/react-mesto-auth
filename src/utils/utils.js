export function renderLoading(isLoading, element, content) {
  if (isLoading) {
    element.textContent = 'Сохранение...'
  } else {
    element.textContent = content
  }
}
