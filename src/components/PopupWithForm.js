import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._isEventListenerAdded = false;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
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

  open() {
    super.open();
  }
}

export default PopupWithForm;
