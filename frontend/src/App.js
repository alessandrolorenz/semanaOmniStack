import React, {useState} from 'react';
import Header from './Header';


function App() {
  const [count, setCounter] = useState(0);
  // Array[valor, funcaoDeAtualizacao]
  function increment(){
    // count++;
    setCounter(count + 1);
  }
  function decrement(){
    setCounter(count - 1);
  }

  return (
    <>
      <Header title="Semana Homni Stack"/>
      <Header>
        <h3>Conter: {count}</h3> 
        <button onClick={increment} >Increment</button>
        <button onClick={decrement} >Increment</button>
      </Header>
    </>
  );
}

export default App;
