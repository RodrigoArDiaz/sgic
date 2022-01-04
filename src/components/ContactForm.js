import React, { useState } from 'react';
import { useForm} from '../hooks/useForm';

const style ={
    color: "#f00",
    fontWeight: "bold"
}

const initialForm = {
    name: "", 
    email: "",
    subject: "",
    comments: "",
}

const validationsForm = (form) =>{
   let errors = {};
   let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
   let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
   let regexComments = /^.{1,255}$/;

   if(!form.name.trim()){
       errors.name = "El campo 'Nombre' es requerido";
   }else if(!regexName.test(form.name.trim())){
       errors.name = "El campo 'Nombre' solo acepta letras y espacios en blancos"
   }
   
   if(!form.email.trim()){
    errors.email = "El campo 'Email' es requerido'";
   }else if(!regexEmail.test(form.email.trim())){
    errors.email = "El campo 'Email' es incorrecto"
  }

   if(!form.subject.trim()){
    errors.subject = "El campo 'Asunto' es requerido'";
   }

   if(!form.comments.trim()){
    errors.comments = "El campo 'Comentarios' es requerido'";
   }else if(!regexComments.test(form.comments.trim())){
    errors.comments = "El campo 'Comentarios' no debe acceder los 255 caracteres"
   }

   return errors;
};

function ContactForm() {
    const {form,
           errors,
           loading,
           response,
           handleChange,
           handleBlur,
           handleSubmit} = useForm(initialForm,validationsForm);

    return ( 
        <div>
            <h2>Formulario de contacto</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Escribe tu nombre"
                    onChange={handleChange} 
                    onBlur = {handleBlur}
                    value={form.name}
                    required
                />

                {errors.name && <p style={style}> {errors.name} </p>}

                <input 
                    type="email" 
                    name="email" 
                    placeholder="Escribe tu email"
                    onChange={handleChange} 
                    onBlur = {handleBlur}
                    value={form.email}
                    required
                />
                
                {errors.email && <p style={style}> {errors.email} </p>}

                <input 
                    type="text" 
                    name="subject" 
                    placeholder="Asunto a tratar"
                    onChange={handleChange} 
                    onBlur = {handleBlur}
                    value={form.subject}
                    required
                />

                {errors.subject && <p style={style}> {errors.subject} </p>}

                <textarea 
                    name="comments" 
                    cols="50"
                    rows="5"
                    placeholder="Escribi tus comentarios"
                    onChange = {handleChange} 
                    onBlur = {handleBlur}
                    value={form.comments}
                    required
                >
                </textarea>

                {errors.comments && <p style={style}> {errors.comments} </p>}

                <input type="submit"
                        value = "Enviar" />
           
            </form>
        </div>
     );
}

export default ContactForm;