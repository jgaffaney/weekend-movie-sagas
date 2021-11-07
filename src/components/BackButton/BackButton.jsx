// a button that will return the user to the home page from anywhere.  
// pass in a text prop for what the button should say

import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';

function BackButton({text}) {

    const history = useHistory();

    return(
        <Button variant='outlined' color='success' onClick={()=>{history.push('/')}}>{text}</Button>
    )
}

export default BackButton;