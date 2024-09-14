import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popupElement.querySelector(".modal__button");
  }

  open(handleConfirmation) {
    super.open();
    this._handleConfirmation = handleConfirmation;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleConfirmation();
    });
  }
}

export default PopupWithConfirmation;
