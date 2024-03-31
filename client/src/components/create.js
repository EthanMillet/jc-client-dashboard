import React from 'react';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { Link, useLocation } from 'react-router-dom';
import { GET_DATAPOINT } from '../utils/queries';
import { GET_USER } from '../utils/queries';
import { GET_REFERENCE } from '../utils/queries';
import { ADD_DATAPOINT } from '../utils/mutatoins';
import { ADD_REFERENCE } from '../utils/mutatoins';


import Auth from '../utils/auth'

  const Create = () => {
    
    const [addReference] = useMutation(ADD_REFERENCE);
    const [refFormState, setrefFormState] = useState({reference: '', scriptureLink: '', quote: ''});

    const [addDataPoint] = useMutation(ADD_DATAPOINT);
    const [mapFormState, setMapFormState] = useState({concept: ''});

    const { loading, error, data } = useQuery(GET_USER);
    if (loading) return "Loading..."
    if (error) return `Error! ${error.message}`


    // create concept 
    const handleMapFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addDataPoint({
                variables: { concept: mapFormState.concept }
            });
        } catch (e) {
            console.log(e)
        }
        window.location.reload();
    };

    const handleMapFormChange = (event) => {
        const { name, value } = event.target;
        setMapFormState({
            ...mapFormState,
            [name]: value
        });
    };

    return (
<div>
<form onSubmit={handleMapFormSubmit}>
<label htmlFor="concept">concept</label>
    <input
        placeholder='concept'
        name='concept'
        type='concept'
        id='concept'
        onChange={handleMapFormChange}/>
    <button type="submit">Submit</button>
</form>

{data.user.dataPoints.map((dataPoints) => (
            <div key={dataPoints._id}>
                <div className='binderBlock'>
                    <Link to="/ref" state={{from: dataPoints._id}}><span data-value="CODEPEN">{dataPoints.concept}</span></Link>
                </div>
            </div>
))}

<button className='button-right' onClick={() => Auth.logout()}>LOGOUT</button>
</div>
    )
  }
  
  export default Create;