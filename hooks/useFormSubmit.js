import { useState } from 'react';

export default function useFormSubmit ( onSubmit ){

    const [ values, setValues ] = useState({name:'', description:'', steps:['']});
    const [ errors, setErrors ] = useState({steps: ['']});

    const handleChange = (e) => {
        const name = e.target.name;

        if(!isNaN(name)){
            let newSteps = values.steps.slice();
            newSteps[name-1] = e.target.value;
            setValues({
                ...values,
                steps: newSteps
            })
        } else {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
        };
    };

    const handleBlur = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        
        let error = validate(name, value);
            
        if(!isNaN(name)){
            let newStepsError = errors.steps.slice();
            newStepsError[name-1] = error;
            setErrors({
                ...errors,
                steps: newStepsError
            });
        } else {
            setErrors({
                ...errors,
                [name]: error
            })
        }
    }

    const handleIngChange = (ing) => {
        setValues({
            ...values,
            ingredients: ing
        })
        
        let error = validate('ingredients', ing);
        setErrors({
            ...errors,
            ingredients: error
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errorObject = {...errors};

        Object.entries(values).forEach( v => {
            if(v[0] !== 'steps' ){
                let error = validate(v[0], v[1]);
                errorObject = {
                    ...errorObject,
                    [v[0]]: error
                }
            } else {
                v[1].forEach( (s,i) => {
                    let error = validate(i, s);
                    let newStepsErrors = errorObject.steps.slice();
                    newStepsErrors[i] = error;

                    errorObject = {
                        ...errorObject,
                        steps: newStepsErrors
                    }
                })
            }
        });

        if(errorObject.name === '' && errorObject.description === '' && errorObject.steps.every( e => e === '')){
            onSubmit(values);
        }
        else{
        console.log(errorObject);
        setErrors(errorObject);
        };
    }

    const validate = (name, value) => {
        var error;
    
        switch (name){
            case 'name':
                if(!isNaN(value)){
                    error = 'El nombre debe contener letras'
                }
                else if(value.length <= 5 || value === ''){
                    error = 'El nombre debe contener mas de 5 carácteres'
                } else error = '';
                break;
            case 'description':
                if (!isNaN(value)) {
                    error = 'La descripción debe contener letras'
                }
                else if (value.length <= 10) {
                    error = 'La descripción debe contener mas de 10 carácteres'
                } else error =  '';
                break;
            case 'ingredients':
                if(value.length === 0){
                    error = 'Su receta debe contener al menos 1 ingrediente'
                } else error = '';
                break;
            default:
                if (!isNaN(value)) {
                    error = 'El paso debe contener letras'
                }
                else if (value.length <= 10) {
                    error = 'El paso debe contener mas de 10 carácteres'
                } else error =  '';
                break;
        }
        console.log(error);
        return error;
    }

    return [values, errors, handleChange, handleSubmit, handleBlur, handleIngChange];
     
}

