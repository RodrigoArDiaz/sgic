import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';

export const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    //handles de eventos
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
           ...form,
           [name]: value, 
        });
    };

    /**
    * @param {*} e
    */
    const handleBlur = (e) => {
        // //Actualiza el estado
        // handleChange(e);

        // //Actualiza los errores
        // setErrors(validateForm(form ));
    };


    const handleSubmit = (e , url) => {
        e.preventDefault();
        //Actualiza el estado
        handleChange(e);

        //Actualiza los errores
        let auxError = validateForm(form );
        setErrors(auxError);
    };


    /**
     * @param {*} e 
     * @param {endpoint para la peticion} url 
     */
    const handleLogin = (e , url) => {
        e.preventDefault();
        //Actualiza el estado
        handleChange(e);

        //Actualiza los errores
        let auxError = validateForm(form );
        setErrors(auxError);
        
        //Peticion
        if(Object.keys(auxError).length === 0){
            console.log("enviando");
            console.log(auxError);
            setLoading(true);
        
            // console.log(form);
            helpHttp()
                .post("http://127.0.0.1:8000/api/auth/login", {
                    body: {email: 'rodogomez@gmail.com', password:'87654321'},
                    // body: form,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                })
                .then((res) => {
                  
                    setLoading(false);
                    setResponse(true);
                    console.log(res);
                    setTimeout(() => {
                        setResponse(false);
                    }, 5000);

                    console.log(res.access_token);

                    window.localStorage.setItem('dataUser', JSON.stringify(res));
                    
                });
        }else{
            console.log("no se puede enviar");
            console.log(auxError);

        }
       
    };

    return{
        form: form,
        errors: errors,
        loading: loading,
        response: response,
        handleChange: handleChange,
        handleBlur: handleBlur,
        handleSubmit: handleSubmit,
        handleLogin: handleLogin,    
    }
}