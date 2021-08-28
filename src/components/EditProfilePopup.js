import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext)    

    const handleChangeName = (evt) => {
        setName(evt.target.value);
    }

    const handleChangeDescription = (evt) => {
        setDescription(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        
        props.onUpdateUser({
            name: name,
            about: description
        })
    }

    React.useEffect(()=>{
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen])

    return(
        <PopupWithForm title="Редактировать профиль" name="edit" buttonContent="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <fieldset className="pop-up__fieldset">
                <input className="pop-up__input" value={name || ''} onChange={handleChangeName} type="text" id="profile-name" name="profileName" placeholder="Ваше имя" minLength="2" maxLength="40" required />
                <span className="pop-up__input-error" id="error">Текст ошибки</span>
            </fieldset>
            <fieldset className="pop-up__fieldset">
                <input className="pop-up__input" value={description || ''} onChange={handleChangeDescription} type="text" id="profile-about" name="profileAbout" placeholder="Расскажите о себе" minLength="2" maxLength="200" required />
                <span className="pop-up__input-error profile-about-error-message">Текст ошибки</span>
            </fieldset>
        </PopupWithForm>        
    )
}

export default EditProfilePopup;