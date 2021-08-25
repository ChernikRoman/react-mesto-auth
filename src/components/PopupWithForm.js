import React from 'react';

function PopupWithForm(props) {

    return(
        <div className={`pop-up pop-up_type_${props.name} ${props.isOpen ? 'pop-up_opened' : ''}`}>
            <div className="pop-up__container">
                <p className="pop-up__title">{props.title}</p>
                <form className="pop-up__form" name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="pop-up__submit-button" type="submit">{props.buttonContent}</button>
                </form>
                <button className="pop-up__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm