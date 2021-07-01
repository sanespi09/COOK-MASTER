import { firebase, db } from '../pages/api/firebase';
import { useState } from 'react';

export default function useRecipes (currentUser){

    const getRecipes = async (currentUser) => {
        let recetas = [];

        const response = await db.collection('users').doc(currentUser.uid).collection('recipes').get();
        // const recetas = await response.data(); 
        response.forEach( doc => {
            recetas.push(doc.data())
        })
        
        recetas = recetas.reverse();

        return recetas;
    }

    return [ getRecipes ];
}
