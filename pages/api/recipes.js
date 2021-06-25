import { db } from "./firebase";
import { v1 as uuid } from "uuid";


export default (req, res) => {
  if( req.method === 'POST' ){
    try {
        addRecipe(req.body);
    }
   catch(err){
       throw error;
   }
   res.status(200);
   }
} 

async function addRecipe(receta){
    let body = JSON.parse(receta);
    let recipe = {
        ...body,
        id: uuid()
    }

    try{
        let response = await db.collection('recipes').doc(recipe.name.replace(' ', '-')).set(recipe);
        console.log(response);
    } catch (err) {
        throw err;
    }
}