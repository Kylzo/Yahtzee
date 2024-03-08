import { Link } from 'react-router-dom'
import logo from '../assets/Y.png'
import '../styles/Banner.css'


function Banner() {
	const title = 'ahtzee'
	const accueil = 'Accueil'
	const login = 'Connexion'
	const signup = 'Inscription'
	return (
		<div className='yahtzee-banner'>
			<img src={logo} alt='logo entreprise yahtzee' className='yahtzee-logo' />
			<h1 className='yahtzee-title'>{title}</h1>
			<nav className='yahtzee-navbar'>
				<Link to="/" className='yahtzee-navbarHome'>{accueil}</Link>
				<Link to="/login" className='yahtzee-navbarLog'>{login}</Link>
				<Link to="/signup" className='yahtzee-navbarSign'>{signup}</Link>
			</nav>
		</div>
	)
}

export default Banner
