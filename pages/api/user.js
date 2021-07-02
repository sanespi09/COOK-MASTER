import { firebase } from './firebase';
import 'firebase/auth';

export default async (req, res) => {
    if( req.method === 'POST' ){
        
        let data = JSON.parse(req.body);
        let user;
        console.log(data);
    
    }
}

