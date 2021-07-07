import {useHistory} from 'react-router-dom';
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleImg from "../assets/images/google-icon.svg";
import '../styles/auth.scss'
import { Button } from "../components/Button";
import {firebase, auth, database} from '../services/firebase';

export function Home (){
  const history = useHistory();
  
  function handleCreateRoom(){
    const provider = new firebase.auth.GoogleAuthProvider(); // faz a autenticação com a conta google
    auth.signInWithPopup(provider).then((result) => { // abre o pop-up da tela de autenticação
      console.log(result);
    });
    history.push('/rooms/new');
  }
  
  return (
    <div id='page-auth'>
      <aside>
       <img src={illustrationImg} alt='Ilustaçao perguntas e respostas' />
       <strong>Crie Salas de Q&amp;A ao vivo</strong> 
       <p>Tire suas duvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt='Letmeask' />
          <Button className='create-room' onClick={handleCreateRoom}>
            <img src={googleImg} alt='Logo do google'/>
            Crie sua sala com google
          </Button>
          <div className ='separator'>
            ou entre em uma sala
          </div>
          <form>
            <input
              type='text'
              placeholder='Digite o codigo da sala'
             />
            <Button type='submit'>Entrar em uma sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}