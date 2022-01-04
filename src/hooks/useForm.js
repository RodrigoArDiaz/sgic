import { useState } from 'react';

export const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    //handles de eventos

    /**
     * 
     * @param {*} e 
     */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({
           ...form,
           [name]: value, 
        });
    };

    /**
     * 
     * @param {*} e 
     */
    const handleBlur = (e) => {
        // //Actualiza el estado
        // handleChange(e);

        // //Actualiza los errores
        // setErrors(validateForm(form ));
    };

    /**
     * 
     * @param {*} e 
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        //Actualiza el estado
        handleChange(e);

        //Actualiza los errores
        setErrors(validateForm(form ));
    };

    return{
        form: form,
        errors: errors,
        loading: loading,
        response: response,
        handleChange: handleChange,
        handleBlur: handleBlur,
        handleSubmit: handleSubmit,    
    }
}