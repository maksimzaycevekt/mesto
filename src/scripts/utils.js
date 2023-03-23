import { api } from "./index.js"

// содержит api запрос на удаление карточки. функция передаётся аргументом в Card
export function deleteCard(cardId) {
  return api.deleteCard(cardId)
 }
//Меняет текст на кнопке сохранения
 export function rendelLoading(isLoading, saveButton, defaultText) {
  if(isLoading) {
    saveButton.textContent = 'Сохранение...'
  } else {
    saveButton.textContent = defaultText
  }
 }

