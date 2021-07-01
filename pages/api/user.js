import { firebase } from './firebase';
import 'firebase/auth';

export default async (req, res) => {
    if( req.method === 'POST' ){
        
        let data = JSON.parse(req.body);
        let user;
        console.log(data);
    
        if(data.email && data.password){
            try{
                var userCredential = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
                user = userCredential.user;
                res.status(200).send(user);
            } catch (error){
                let errorCode = error.code;
                let errorMessage = error.message;
                res.status(400).send(errorMessage);
            }
        }
    } else if (req.method === 'GET'){
        let data = JSON.parse(req.body);
        let user;
        console.log(data);
    
        if(data.email && data.password){
            try{
                var userCredential = await firebase.auth().SignInWithEmailAndPassword(data.email, data.password);
                user = userCredential.user;
                res.status(200).send(user);
            } catch (error){
                let errorCode = error.code;
                let errorMessage = error.message;
                res.status(400).send(errorMessage);
            }
        }
    }
} 
