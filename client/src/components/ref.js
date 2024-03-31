import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import { GET_DATAPOINT } from '../utils/queries';
import { GET_REFERENCE } from '../utils/queries';
import { ADD_REFERENCE } from '../utils/mutatoins';


import Auth from '../utils/auth'

  const Create = () => {

    const location = useLocation()
    const { from } = location.state
    
    const [addReference] = useMutation(ADD_REFERENCE);
    const [refFormState, setrefFormState] = useState({reference: '', scriptureLink: '', quote: ''});
    
    const { loading, error, data } = useQuery(GET_DATAPOINT, {
        variables:{ _id: from}
    });
    
    if (loading) return "Loading..."
    if (error) return `Error! ${error.message}`

        // create reference 
        const handleRefFormSubmit = async (event) => {
            event.preventDefault();
            try {
                await addReference({
                    variables: { reference: refFormState.reference, scriptureLink: refFormState.scriptureLink, quote: refFormState.quote, conceptID: data.dataPoint._id }
                });
            } catch (e) {
                console.log(e)
            }

        };
    
        const handleRefFormChange = (event) => {
            const { name, value } = event.target;
            setrefFormState({
                ...refFormState,
                [name]: value
            });
        };

        console.log(data.dataPoint._id)

    return (
<div>


{/* create map */}
<form onSubmit={handleRefFormSubmit}>
<label htmlFor="concept">reference</label>
    <input
        placeholder='reference'
        name='reference'
        type='reference'
        id='reference'
        onChange={handleRefFormChange}/>
        <label htmlFor="scriptureLink">scriptureLink</label>
    <input
        placeholder='scriptureLink'
        name='scriptureLink'
        type='scriptureLink'
        id='scriptureLink'
        onChange={handleRefFormChange}/>
        <label htmlFor="quote">quote</label>
    <input
        placeholder='quote'
        name='quote'
        type='quote'
        id='quote'
        onChange={handleRefFormChange}/>
    <button type="submit">Submit</button>
</form>

<button className='button-right' onClick={() => Auth.logout()}>LOGOUT</button>
</div>
    )
  }
  
  export default Create;