//импортируем классы и константы
import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  apiOptions,
  formSelectors,
  userDataSelectors,
  photoGridSelector,
  cardTemplateSelector,
  popupPicture,
  popupAddCard,
  popupEditUserdata,
  popupEditAvatar,
  popupDeleteCard,
  profileEditButton,
  addPictureButton,
  avatarEditButton,
  storage,
  formValidators
} from '../utils/constants.js';


//создаём экземпляр класса Api
export const api = new Api(apiOptions);

//создаём экземпляры класса FormValidator для всех форм и включаем валидацию
const enableValidation = ({ formSelector, ...config }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
};

enableValidation(formSelectors);

//функция обработки стандартных для всех форм с сабмитом операций
function handleSubmit(request, popupElement) {
  popupElement.renderLoading(true);
  request()
    .then(() => {
      popupElement.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupElement.renderLoading(false);
    });
}

//функция создания карточки
function createCard(item) {
  const card = new Card({
    item,
    cardTemplateSelector,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    },
    onLikePress: (id, condition) => {
      api.changeLike(id, condition)
        .then((likedCard) => {
          card.updateLikes(likedCard);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deletePopupOpen: () => {
      popupDeleteCardForm.open();
    }
  });
  
  return card.generate();
}

//создаём экземпляр класса popupAddCardForm для создания новой карточки и подключаем слушатели
const popupAddCardForm = new PopupWithForm({
  popup: popupAddCard,
  submitter: data => {
    function makeRequest() {
      return api.postNewCard(data)
        .then((item) => {
          const cardElement = createCard(item);
          initialCardList.addItemToTop(cardElement);
        });
    }

    handleSubmit(makeRequest, popupAddCardForm);
  }
});
popupAddCardForm.setEventListeners();

//создаём экземпляр класса popupEditUserdataForm для создания обновления информации пользователя и подключаем слушатели
const popupEditUserdataForm = new PopupWithForm({
  popup: popupEditUserdata,
  submitter: data => {
    function makeRequest() {
      return api.patchProfileData(data)
        .then((userData) => {
          userInfo.setUserInfo(userData);
        });
    }

    handleSubmit(makeRequest, popupEditUserdataForm);
  }
});
popupEditUserdataForm.setEventListeners();

//создаём экземпляр класса popupEditAvatarForm для создания обновления информации пользователя и подключаем слушатели
const popupEditAvatarForm = new PopupWithForm({
  popup: popupEditAvatar,
  submitter: data => {
    function makeRequest() {
      return api.patchAvatar(data)
        .then((userData) => {
          userInfo.setUserInfo(userData);
        });
    }

    handleSubmit(makeRequest, popupEditAvatarForm);
  }
});
popupEditAvatarForm.setEventListeners();

//создаём экземпляр класса popupWithImage для отображения полноразмерных фото и подключаем слушатели
const popupWithImage = new PopupWithImage(popupPicture);
popupWithImage.setEventListeners();

//создаём экземпляр класса popupDeleteCardForm для удаления карточки и подключаем слушатели
const popupDeleteCardForm = new PopupWithForm({
  popup: popupDeleteCard,
  submitter: () => {
    api.deleteCard(storage.cardToDelete.id)
      .then(() => {
        storage.cardToDelete.element.remove();
        popupDeleteCardForm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
popupDeleteCardForm.setEventListeners();

//создаём экземпляр класса Section для загрузки на сайт карточек с фотографиями
const initialCardList = new Section({
  renderer: item => {
    const cardElement = createCard(item);
    initialCardList.addItemToBottom(cardElement);
  }
}, photoGridSelector);

//создаём экземпляр класса с данными пользователя
const userInfo = new UserInfo(userDataSelectors);

//добавляем event открытия модального окна к кнопке редактирования данных пользователя и сброс проверки валидации
profileEditButton.addEventListener('click', () => {
  popupEditUserdataForm.setInputValues(userInfo.getUserInfo());
  formValidators['user-data-form'].reloadValidation();
  popupEditUserdataForm.open();
});

//добавляем event открытия модального окна к кнопке добавления новой фотографии и сброс проверки валидации
addPictureButton.addEventListener('click', function() {
  formValidators['add-picture-form'].reloadValidation();
  popupAddCardForm.open();
});

//добавляем event открытия модального окна к кнопке изменения аватара и сброс проверки валидации
avatarEditButton.addEventListener('click', function() {
  formValidators['user-avatar-form'].reloadValidation();
  popupEditAvatarForm.open();
});

//промис, при исполнении которого загружается информация на сайт и отрисовывается DOM при загрузке
Promise.all([
  api.getInitialUserData(),
  api.getInitialCards()
])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    storage.userID = userData._id;
    initialCardList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(err);
  })