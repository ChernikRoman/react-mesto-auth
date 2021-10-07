import React from "react";
import { Route, useHistory, Switch} from "react-router-dom";
import Header from "./Header";
import Main from "./Main"
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import { register, authorize } from "../utils/auth";
import api from '../utils/api';
import CurrentUserContext from "../contexts/CurrentUserContext";
import InfoTooltip from "../components/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen,setIsConfirmPopupOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [statusTooltip, setStatusTooltip] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserEmail, setCurrentUserEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [deletedCard, setDeletedCard] = React.useState({});
  const history = useHistory();

  React.useEffect(()=>{
    api.loadUserInfo()
      .then(data => {
        setCurrentUser(data);
        setCurrentUserEmail(data.email);
        api.getCards()
          .then(data => setCards(data))
          .catch(data => console.log('Ошибка при обращении к серверу ' + data));
        setLoggedIn(true);
      })
      .catch(data => {
        console.log('Ошибка при обращении к серверу ' + data)
        history.push('/sign-up')
      });
  }, [loggedIn])

  const openEditPopup = ()=> {
    setIsEditProfilePopupOpen(true)
  }

  const openAddPlacePopup = ()=> {
    setIsAddPlacePopupOpen(true)
  }

  const openEditAvatarPopup = ()=> {
    setIsEditAvatarPopupOpen(true)
  }

  const handleCardClick = (card)=> {
    setSelectedCard(card)
  }

  const closeAllPopups = ()=> {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsTooltipOpen(false)
    setSelectedCard({})
  }

  const handleUpdateUser = (userData) => {
    api.updateUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(data => console.log('Ошибка при обращении к серверу ' + data));
  }

  const handleUpdateAvatar = (avatarData) => {
    api.changeAvatar(avatarData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();      
      })
      .catch(data => console.log('Ошибка при обращении к серверу ' + data));
  }

  const handleAddCard = (data) => {
    api.addCard(data)
      .then((data)=>{
        setCards([data, ...cards])
        closeAllPopups();        
      })
      .catch(data => console.log('Ошибка при обращении к серверу ' + data));
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
          setCards(
              cards.map((item) => item._id === card._id ? newCard : item)
          );
      })
      .catch(data => console.log('Ошибка при обращении к серверу ' + data));
  }

  const handleSubmitConfirm = (evt) => {
    evt.preventDefault();
    api.handleDeleteCard(deletedCard._id)
      .then(() => {
        setCards(
          cards.filter((item) => item._id !== deletedCard._id)
        );
      setDeletedCard({})
      closeAllPopups();
      })
      .catch(data => console.log('Ошибка при обращении к серверу ' + data));
  }

  function handleCardDelete (card) {
    setDeletedCard(card)
    setIsConfirmPopupOpen(true);
  }

  const handleRegisterSubmit = (email, password) => {
    register(email, password)
    .then(()=>{
      setIsTooltipOpen(true);
      setStatusTooltip(true);
      history.push('/sign-in');
    })
    .catch((err)=>{
      setIsTooltipOpen(true);
      setStatusTooltip(false);
      console.log('Возникла ошибка ' + err);
    })
  }

  const handleLoginSubmit = (email, password) => {
    authorize(email, password)
    .then((data)=> {
      localStorage.setItem('jwt', data.token);
      setLoggedIn(true);
      history.push('/')
    })
    .catch((err)=>{
      console.log('Возникла ошибка ' + err)
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userEmail={currentUserEmail} handleSignOut={setLoggedIn}/>
      <Switch>
        <Route path="/sign-up">
          <Register handleSubmit={handleRegisterSubmit} />
        </Route>
        <Route path="/sign-in">
          <Login handleSubmit={handleLoginSubmit} />
        </Route>
        <Route exact path="/">
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={openEditPopup}
            onAddPlace={openAddPlacePopup}
            onEditAvatar={openEditAvatarPopup}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
        </Route>
      </Switch>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>
      <PopupWithForm title="Вы уверены?" name="confirm" buttonContent="Да" isOpen={isConfirmPopupOpen} onSubmit={handleSubmitConfirm} onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <InfoTooltip isOpen={isTooltipOpen} status={statusTooltip} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
