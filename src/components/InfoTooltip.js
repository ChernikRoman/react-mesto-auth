import React from 'react';
import imageOk from '../images/pop-up/OK.svg';
import imageError from '../images/pop-up/Error.svg';

function InfoTooltip(props) {
    const statusOK = props.status;
    const messageOK = 'Вы успешно зарегистрировались!';
    const messageError = 'Что-то пошло не так! Попробуйте ещё раз.';

    return(
        <div className={`pop-up ${props.isOpen ? 'pop-up_opened' : ''}`}>
            <div className="pop-up__container">
                <img className="pop-up__status-logo" src={ statusOK ?imageOk :imageError} alt="status-logo"/>
                <p className="pop-up__message">{ statusOK ?messageOK :messageError}</p>
                <button className="pop-up__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip