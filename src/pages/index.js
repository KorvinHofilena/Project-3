import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  validationConfig,
  cardTemplateSelector,
  containerSelector,
  userProfileSelectors,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3fc0478b-e0b7-4d6b-a203-6dc78462ac26",
    "Content-Type": "application/json",
  },
});

const profileEditButton = document.getElementById("profile-edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const profileEditForm = document.getElementById("profile-edit-form");
const addPlaceForm = document.getElementById("add-place-form");
const profileTitleInput = document.getElementById("profile-title-input");
const profileDescriptionInput = document.getElementById(
  "profile-description-input"
);

const avatarEditButton = document.querySelector(".profile__avatar-edit");
const avatarEditForm = document.getElementById("avatar-edit-form");
const avatarUrlInput = document.getElementById("avatar-url-input");

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

function handleCardClick(name, link) {
  imagePopup.open({ name, link });
}

function handleDeleteCard(cardId, card) {
  if (!cardId) {
    console.error("Card ID is invalid or missing.");
    return;
  }

  confirmationPopup.open(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        card._handleDelete();
        confirmationPopup.close();
      })
      .catch((err) => {
        console.error(`Error deleting card: ${err}`);
      });
  });
}

function handleLikeClick(cardId, isLiked) {
  if (!cardId) {
    console.error("Card ID is invalid or missing.");
    return Promise.reject("Card ID is invalid or missing.");
  }
  return isLiked ? api.dislikeCard(cardId) : api.likeCard(cardId);
}

function createCard(data) {
  const card = new Card(
    data,
    cardTemplateSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick
  );
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

function renderAllCards(apiCards) {
  if (apiCards.length === 0) {
    console.log("No cards to display.");
  } else {
    cardSection.renderItems(apiCards);
  }
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, apiCards]) => {
    userInfo.setUserInfo(userData);
    renderAllCards(apiCards);
  })
  .catch((err) => {
    console.error(`Error loading user info or cards: ${err}`);
  });

const profilePopup = new PopupWithForm("#profile-edit-modal", {
  handleFormSubmit: (formData) => {
    profilePopup.updateSubmitButtonText("Saving...");
    api
      .setUserInfo(formData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
        profilePopup.close();
      })
      .catch((err) => {
        console.error(`Error updating profile: ${err}`);
      })
      .finally(() => {
        profilePopup.updateSubmitButtonText("Save");
      });
  },
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm("#add-place-modal", {
  handleFormSubmit: (formData) => {
    cardPopup.updateSubmitButtonText("Saving...");
    api
      .addNewCard(formData)
      .then((cardData) => {
        const cardElement = createCard(cardData);
        cardSection.addItem(cardElement);
        cardPopup.close();
      })
      .catch((err) => {
        console.error(`Error adding new card: ${err}`);
      })
      .finally(() => {
        cardPopup.updateSubmitButtonText("Save");
      });
  },
});
cardPopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-view-modal");
imagePopup.setEventListeners();

const confirmationPopup = new PopupWithConfirmation("#delete-card-modal");
confirmationPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar-edit-modal", {
  handleFormSubmit: (formData) => {
    avatarPopup.updateSubmitButtonText("Saving...");
    api
      .setUserAvatar(formData)
      .then((userData) => {
        document.querySelector(".profile__image").src = userData.avatar;
        avatarPopup.close();
      })
      .catch((err) => {
        console.error(`Error updating avatar: ${err}`);
      })
      .finally(() => {
        avatarPopup.updateSubmitButtonText("Save");
      });
  },
});
avatarPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  profileEditFormValidator.resetValidation();
  profilePopup.open();
});

addPlaceButton.addEventListener("click", () => {
  addPlaceFormValidator.resetValidation();
  cardPopup.open();
});

avatarEditButton.addEventListener("click", () => {
  avatarEditFormValidator.resetValidation();
  avatarPopup.open();
});

const profileEditFormValidator = new FormValidator(
  validationConfig,
  profileEditForm
);
profileEditFormValidator.enableValidation();

const addPlaceFormValidator = new FormValidator(validationConfig, addPlaceForm);
addPlaceFormValidator.enableValidation();

const avatarEditFormValidator = new FormValidator(
  validationConfig,
  avatarEditForm
);
avatarEditFormValidator.enableValidation();
