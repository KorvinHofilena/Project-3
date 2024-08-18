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
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    if (!this._isEventListenerAdded) {
      super.setEventListeners();
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
      this._isEventListenerAdded = true;
    }
  }

  open() {
    super.open();
    this._form.reset();
  }
}

export default PopupWithForm;
