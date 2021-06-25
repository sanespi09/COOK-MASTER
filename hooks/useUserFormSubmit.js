import { useState } from 'react';

export default function useFormSubmit ( onSubmit ){

    const [ values, setValues ] = useState({email:'', password:''});
    const [ errors, setErrors ] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;

        setValues({
            ...values,
            [name]: e.target.value
        });
    };

    const handleBlur = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        
        let error = validate(name, value);
        console.log(error);

        setErrors({
                ...errors,
                [name]: error
            })
        }


    const handleSubmit = (e) => {
        e.preventDefault();
        let errorObject = {...errors};

        let valueEntries = Object.entries(values);

        valueEntries.forEach( v => {
                let error = validate(v[0], v[1]);
                errorObject = {
                    ...errorObject,
                    [v[0]]: error
                }
        });

        // console.log(Object.entries(errorObject).every( e => { return e[1] === ''}));

        if(Object.entries(errorObject).every( e => { return e[1] === '' })){
            onSubmit(values);
        }

        else{
        console.log(errorObject);
        setErrors(errorObject);
        };
    }

    const validate = (name, value) => {
        let error;
    
        switch (name){
            case 'email':
                let mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!isNaN(value)) {
                    error = 'El mail debe contener letras'
                }
                else if (!mailRegex.test(value)) {
                    error = 'El mail ingresado no es valido'
                } else error =  '';
                break;
            case 'password':
                if(value.length < 8){
                    error = 'La contraseña debe contener un minimo de 8 carácteres'
                }
                else if (!isNaN(value) || !/\d+/.test(value)) {
                    error = 'La contraseña debe contener letras y numeros'
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
        // console.log(error);
        return error;
    }

    return [values, errors, handleChange, handleBlur, handleSubmit];
     
}

