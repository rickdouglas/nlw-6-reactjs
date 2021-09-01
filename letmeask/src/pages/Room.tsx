import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import imgLogo from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import {RoomCode} from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss';

type RoomParams ={
  id: string;
}

export function Room () {
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const {user} = useAuth();

  async function handleSendQuestion(event: FormEvent){
    event.preventDefault();

    if(newQuestion.trim() === null || "" ){
      return;
    }
    if(!user) {
      throw new Error('You must be signed in !')
    }
    const question = {
      content: newQuestion,
      author: {
        name:user.name,
        avatar:user.avatar,
      },
      isHightlighted: false,
      isAnswered:false
    };
    
    await database.ref(`rooms/${params.id}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={imgLogo} alt="Letmeask" />
          <RoomCode code={params.id} />
        </div>
      </header>
      
      <main>
        <div className="room-title">
          <h1>Sala teste</h1>
          <span>4 perguntas</span>
        </div>
        
        <form onSubmit={handleSendQuestion}>
          <textarea placeholder="O que vc quer perguntar ?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion} />
        
          <div className="form-footer">
            {user ? (
              <div className='user-info'> 
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>  
              </div>
            ) : (
              <span>Para enviar sua pergunta<button>faça seu login</button>.</span>
            )}
            <Button disabled={!user} type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}