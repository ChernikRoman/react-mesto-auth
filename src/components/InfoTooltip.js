import React from 'react';
import okImage from '../images/pop-up/OK.svg';
import errorImage from '../images/pop-up/Error.svg';

function InfoTooltip(props) {
    const statusOK = props.status;
    const textOK = 'Вы успешно зарегистрировались!';
    const textError = 'Что-то пошло не так! Попробуйте ещё раз.';

    return(
        <div className={`pop-up ${props.isOpen ? 'pop-up_opened' : ''}`}>
            <div className="pop-up__container">
                <img className="pop-up__status-logo" src={ statusOK ?okImage :errorImage} />
                <p className="pop-up__message">{ statusOK ?textOK :textError}</p>
                <button className="pop-up__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip