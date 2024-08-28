import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  validationConfig,
  cardTemplateSelector,
  containerSelector,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/cohortId",
  headers: {
    authorization: "YOUR_TOKEN_HERE",
    "Content-Type": "application/json",
  },
});

const userProfileSelectors = {
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

const profilePopup = new PopupWithForm("#profile-edit-modal", {
  handleFormSubmit: (formData) => {
    profilePopup.renderLoading(true);
    api
      .setUserInfo(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
        profilePopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => profilePopup.renderLoading(false));
  },
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm("#add-place-modal", {
  handleFormSubmit: (formData) => {
    cardPopup.renderLoading(true);
    api
      .addNewCard(formData)
      .then((cardData) => {
        const cardElement = createCard(cardData);
        cardSection.addItem(cardElement);
        cardPopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => cardPopup.renderLoading(false));
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
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  containerSelector
);

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  profilePopup.open();
});

addPlaceButton.addEventListener("click", () => {
  addPlaceFormValidator.resetValidation();
  cardPopup.open();
});

const profileEditFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
profileEditFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(validationConfig, addPlaceForm);
addPlaceFormValidator.enableValidation();
