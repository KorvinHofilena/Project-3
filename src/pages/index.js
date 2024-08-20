import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationConfig,
  cardTemplateSelector,
  containerSelector,
} from "../utils/constants.js";

const userProfileSelectors = {
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
};

const profileEditButton = document.getElementById("profile-edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const profileEditForm = document.getElementById("profile-edit-form");
const addPlaceForm = document.getElementById("add-place-form");
const profileTitleInput = document.getElementById("profile-title-input");
const profileDescriptionInput = document.getElementById(
  "profile-description-input"
);

const userInfo = new UserInfo(userProfileSelectors);

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  profilePopup.open();
});

const profilePopup = new PopupWithForm("#profile-edit-modal", {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      job: formData.about,
    });
    profilePopup.close();
  },
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm("#add-place-modal", {
  handleFormSubmit: (formData) => {
    const cardElement = createCard({
      name: formData.title,
      link: formData.link,
    });

    cardSection.addItem(cardElement);
    cardPopup.close();
  },
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-view-modal");
imagePopup.setEventListeners();

function createCard(data) {
  const card = new Card(data, cardTemplateSelector, () => {
    imagePopup.open(data);
  });
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  containerSelector
);

cardSection.renderItems();

addPlaceButton.addEventListener("click", () => {
  addPlaceFormValidator.toggleButtonState();
  cardPopup.open();
});

const profileEditFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
profileEditFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(validationConfig, addPlaceForm);
addPlaceFormValidator.enableValidation();
