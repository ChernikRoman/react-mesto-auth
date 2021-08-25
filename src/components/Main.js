import React from "react"
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card"

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);



    const cardsElements =  props.cards.map((card) => {
        return (<Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)
    });

    return(
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" style={{backgroundImage: `url(${currentUser.avatar})`}}>
                    <div className="profile__new-avatar-button" onClick={props.onEditAvatar}></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    <h2 className="profile__about">{currentUser.about}</h2>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards">
                {cardsElements}
            </section>
        </main>
    )
}

export default Main
