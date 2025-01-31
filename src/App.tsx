import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Box from './components/Box/Box'
import { Teacher } from './models/teacher'
import { apiFetch } from './services/teacherService'



function App() {

  const [count, setCount] = useState(0)
  const [text, setText] = useState<Teacher[]>([]);
  // const [text, setText] = useState(
  //   [
  //     {a:'ta mère en string de guerre ',b:'couleur panthère'},
  //     {a:'je m\'appelle TIRIPOU c\'est la sorcière elle réduit les hommes en esclavage ',b:'mais elle réduit aussi les Pénis'}
  //   ])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

useEffect(()=> {
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await apiFetch("http://localhost:5148/teachers");
      setText(result);
    }catch(err: any){
      setError(err.message);

    }finally{
      setLoading(false);
    }
  };
  fetchData();

}, []);
if (error) return <p> Error: {error}</p>;
if(loading) return <p>Loading ...</p>;


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>

        
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
     {text.map((txt:Teacher) => { 
       return <Box text={txt.firstName} textBis={txt.lastName}></Box>
     }
    )}
    </>
  )
}

export default App
