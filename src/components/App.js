import React from "react";
import { Route, useHistory, Switch} from "react-router-dom";
import Main from "./Main"
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import { getUserInfo } from "../utils/auth";
import api from '../utils/api';
import CurrentUserContext from "../contexts/CurrentUserContext";
import InfoTooltip from "../components/InfoTooltip";

function App(props) {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen,setIsConfirmPopupOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [statusTooltip, setStatusTooltip] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [deletedCard, setDeletedCard] = React.useState('');
  const history = useHistory();

  React.useEffect(()=>{
    api.loadUserInfo()
      .then(data => setCurrentUser(data))
      .catch(data => console.log('Ошибка при обращении к серверу ' + data));
      
    api.getCards()
      .then(data => setCards(data))
      .catch(data => console.log('Ошибка при обращении к серверу ' + data));

    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      getUserInfo(jwt)
        .then(data=>{
          console.log(data)
          setLoggedIn(true)
        }) 
    } else {
      history.push('/sign-up')
    }
  }, [])

  const openEditPopup = ()=> {
    setIsEditProfilePopupOpen(true)
  }

  const openAddPlacePopup = ()=> {
    setIsAddPlacePopupOpen(true)
    // api.addCard({
    //   newPlaceName: 'BMW',
    //   newPlaceLink: 'https://images.unsplash.com/photo-1544986342-f4f2e11b7c02?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    // })
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
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeStatus(card._id, isLiked)
      .then((newCard) => {
          setCards(
              cards.map((item) => item._id === card._id ? newCard : item)
          );
    });
  }

  const handleSubmitConfirm = (evt) => {
    evt.preventDefault();
    api.handleDeleteCard(deletedCard._id)
      .then(() => {
        setCards(
          cards.filter((item) => item._id !== deletedCard._id)
        );
      setDeletedCard('')
      closeAllPopups();
      })
      .catch(data => console.log('Ошибка при обращении к серверу ' + data));
  }

  function handleCardDelete (card) {
    setDeletedCard(card)
    setIsConfirmPopupOpen(true);
  }

  const handleSubmitOK = () => {
    setIsTooltipOpen(true);
    setStatusTooltip(true);
  }

  const handleSubmitErr = () => {
    setIsTooltipOpen(true);
    setStatusTooltip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/sign-up">
          <Register handleSubmitOK={handleSubmitOK} handleSubmitErr={handleSubmitErr}>
            <InfoTooltip isOpen={isTooltipOpen} status={statusTooltip} onClose={closeAllPopups} />
          </Register>
        </Route>
        <Route path="/sign-in">
          <Login changeLoggedIn={setLoggedIn} handleSubmitOK={handleSubmitOK} handleSubmitErr={handleSubmitErr}>
            <InfoTooltip isOpen={isTooltipOpen} status={statusTooltip} onClose={closeAllPopups} />
          </Login>
        </Route>
        <Route exact path="/">
          {loggedIn && 
          <>
            <Main onEditProfile={openEditPopup} onAddPlace={openAddPlacePopup} onEditAvatar={openEditAvatarPopup} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards}/>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard}/>
            <PopupWithForm title="Вы уверены?" name="confirm" buttonContent="Да" isOpen={isConfirmPopupOpen} onSubmit={handleSubmitConfirm} onClose={closeAllPopups} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          </>}
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
