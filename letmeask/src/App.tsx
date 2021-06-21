import React from 'react';
import {Button} from './components/Button'

function App() {
  return (
    <div>
      <p>Testando renderizaçao de components</p>
      <Button />
    </div> // no ultimo elemento é setado o valor default por nao contem nenhum valor passado na propriedade
  );
}

export default App;
