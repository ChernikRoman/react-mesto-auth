import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = currentUser._id === props.card.owner._id
    const isLiked = props.card.likes.some(i => i._id === currentUser._id)
    const cardLikeButtonClassName = `card__like-button ${isLiked ?'card__like-button_active' :''}`

    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? '' : 'card__delete-button_hidden'}`
    );

    const handleCardClick = ()=> {
        props.onCardClick(props.card)
    }

    const handleLikeClick = () => {
        props.onCardLike(props.card)
    }

    const handleDeleteClick = () => {
        props.onCardDelete(props.card)
    }

    return (
        <article className="card">
            <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick}/>
            <div className="card__title">
                <h2 className="card__text">{props.card.name}</h2>
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                <p className="card__quantity-of-likes">{props.card.likes.length}</p>
            </div>
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} ></button>
        </article>
    )
}

export default Card