import spinner from '../assets/Y.png'
import '../styles/welcome.css'


function Welcome() {
	const welcome = " Bienvenue ! "
	const title = "Veuillez vous connecter ou vous inscrire."
	return (
		<div className='yahtzee-load'>
			<img src={spinner} alt='logo entreprise yahtzee' className='yahtzee-spinner' />
			<h2 className='yahtzee-titleLoad'>{title}</h2>
			<h1 className='yahtzee-welcomeLoad'>{welcome}</h1>

		</div>
	)
}

export default Welcome