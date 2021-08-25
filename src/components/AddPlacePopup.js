import React  from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [text, setText] = React.useState();
    const [link, setLink] = React.useState();

    React.useEffect(()=>{
        setText('');
        setLink('');
    },[props.isOpen])

    const handleTextChange = (evt) => {
        setText(evt.target.value)
    }

    const handleLinkChange = (evt) => {
        setLink(evt.target.value)
    }

    const handleAddPlaceSubmit = (evt) => {
        evt.preventDefault();

        props.onAddCard({
            newPlaceName: text,
            newPlaceLink: link 
        })
    }

    return(
        <>
            <PopupWithForm title="Новое место" name="new-card" buttonContent="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleAddPlaceSubmit}>
                <fieldset className="pop-up__fieldset">
                    <input className="pop-up__input" value={text || ''} onChange={handleTextChange} type="text" id="new-place-name" name="newPlaceName" placeholder="Название" minLength="2" maxLength="30" required />
                    <span className="pop-up__input-error new-place-name-error-message">Текст ошибки</span>
                </fieldset>
                <fieldset className="pop-up__fieldset">
                    <input className="pop-up__input" value={link || ''} onChange={handleLinkChange} type="url" id="new-place-link" name="newPlaceLink" placeholder="Ссылка на картинку" required />
                    <span className="pop-up__input-error new-place-link-error-message">Текст ошибки</span>
                </fieldset>
            </PopupWithForm>
        </>
    )
}

export default AddPlacePopup;