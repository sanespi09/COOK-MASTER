export default function IngredientReducer (state, action) {
    let newList;
    switch(action.type){
        case 'add':
            newList = state.ingredients.slice();
            if(newList.indexOf(action.payload) === -1){
            newList.push(action.payload);
            return {ingredients: newList};
            } else return {ingredients: state.ingredients};
        case 'remove':
            newList = state.ingredients.filter( i => i != action.payload);
            return { ingredients: newList };
    }
}