import './App.css'
import Router from './Router/Router';
import { auth, onAuthStateChanged } from './Firebase/Firebase';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = JSON.stringify(user);
        dispatch({ type: 'SIGNEDIN', userData });
      }
    });
  }, [dispatch])

  return (
    <>
      <Router />
    </>
  )
}
export default App;
