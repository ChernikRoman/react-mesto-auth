import React from 'react';

function ImagePopup(props) {

    return(
        <div className={`pop-up pop-up_type_preview ${props.card.name !== undefined ?'pop-up_opened' :'' }`}>
            <div className="pop-up__container pop-up__container_preview">
                <img className="pop-up__photo" src={props.card.link} alt={props.card.name} />
                <p className="pop-up__description">{props.card.name}</p>
                <button className="pop-up__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup