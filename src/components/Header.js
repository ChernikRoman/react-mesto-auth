import React from 'react';
import logo from '../images/header/mesto-logo.svg';
import { Link, withRouter } from 'react-router-dom';
import api from '../utils/api';

function Header (props) {

    const [loginContent, setLoginContent] = React.useState();
    const [link, setLink] = React.useState('');
    const [email, setEmail] = React.useState();

    const styleLink = {
        display: 'inline-block',
        textDecoration: 'none',
        marginTop: 'auto',
        marginRight: '0',
        marginBottom: 'auto',
        marginLeft: '24px',
        fontSize: '18px',
        lineHeight: '22px',
        textAlign: 'right',
        color: '#A9A9A9'
    }

    function choiceContent() {
        const currentLink = props.location.pathname;
        if (currentLink === '/sign-up') {
            setLoginContent('Войти');
            setLink('/sign-in');
            setEmail('');
        } else if (currentLink === '/sign-in' ) {
            setLoginContent('Регистрация');
            setLink('/sign-up');
            setEmail('');
        } else if (currentLink === '/') {
            setLoginContent('Выйти');
            setLink('/sign-up');
            setEmail(props.userEmail);
        }
    }

    function handleClick() {
        api.logout();
        props.handleSignOut(false);
        localStorage.removeItem('loggedIn')
    }

    React.useEffect(()=>{
        choiceContent();
    }, [props.location.pathname, props.userEmail])

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Место" />
            <span className="header__email">{email}</span>
            { props.location.pathname === '/' 
              ? <Link to={link} style={styleLink} onClick={handleClick}>{loginContent}</Link>
              : <Link to={link} style={styleLink}>{loginContent}</Link>
            }
        </header>        
    )
}

export default withRouter(Header);