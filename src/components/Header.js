import React from 'react';
import logo from '../images/header/mesto-logo.svg';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../utils/auth';

function Header () {

    const [email, setEmail] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [link, setLink] = React.useState('');
    const [handler, setHandler] = React.useState();

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

    React.useEffect(()=>{
        const link = window.location.pathname;
        const jwt = localStorage.getItem('jwt');
        const email =''
        if (jwt) {
            email = getUserInfo(jwt).then(data=>setEmail(data))
        }

        if (link === '/sign-up') {
            setLogin('Войти');
            setLink('/sign-in');
            setEmail('')
            setHandler()

        } else if (link == '/sign-in' ) {
            setLogin('Регистрация');
            setLink('/sign-up');
            setEmail('')
            setHandler()
        } else if (link == '/') {
            setLogin('Выйти');
            setLink('/sign-up');
            setHandler(signOut)
        }

    }, [])

    function signOut() {
        localStorage.removeItem('jwt')
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Место" />
            <span className="header__email">{email}</span>
            <Link to={link} style={styleLink} onClick={handler}>{login}</Link>
        </header>        
    )
}

export default Header;