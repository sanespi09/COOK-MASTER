import '../styles/globals.scss';
import { useState, useEffect } from 'react';
import UserContext from '../components/context/UserContext';
import { firebase } from './api/firebase';
import 'firebase/auth';

function MyApp({ Component, pageProps }) {
  // console.log(pageProps);
  const [ currentUser, setUser ] = useState();

  const changeUser = (user) => {
    setUser(user);
  }

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((user) => {
      if (user){
        changeUser(user);
        window.localStorage.setItem('currentUser', JSON.stringify(user));
      }   
      else changeUser(null);
    });
    
    setUser(JSON.parse(window.localStorage.getItem('currentUser')));
    return () => listener(); 
  }, [])

  return (
    <UserContext.Provider value={currentUser}>
      <Component {...pageProps} UserContext={UserContext} />
    </ UserContext.Provider>
    )
}

export default MyApp
