import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._submitButton = this._form.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this._isEventListenerAdded = false;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  updateSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    if (!this._isEventListenerAdded) {
      super.setEventListeners();
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this._form.reset();
      });
      this._isEventListenerAdded = true;
    }
  }

  close() {
    super.close();
    this._form.reset();
    this.updateSubmitButtonText(this._submitButtonText);
  }
}

export default PopupWithForm;
