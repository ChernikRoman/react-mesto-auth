import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarLink = React.useRef();

    React.useEffect(()=>{
      avatarLink.current.value = '';
    }, [props.isOpen]) 

    function handleSubmit(evt) {
      evt.preventDefault();

      props.onUpdateAvatar(avatarLink.current.value)
    }

    return(
      <PopupWithForm title="Обновить аватар" name="change-avatar" buttonContent="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
        <fieldset className="pop-up__fieldset">
            <input className="pop-up__input" ref={avatarLink} defaultValue='' id="new-avatar" name="newAvatar" placeholder="Введдите ссылку" type="url" required />
            <span className="pop-up__input-error new-place-link-error-message">Текст ошибки</span>
        </fieldset>
      </PopupWithForm>
    )
}

export default EditAvatarPopup