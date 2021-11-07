// a button that will return the user to the home page from anywhere.  
// pass in a text prop for what the button should say

import { useHistory } from "react-router-dom";

function BackButton({text}) {

    const history = useHistory();

    return(
        <button onClick={()=>{history.push('/')}}>{text}</button>
    )
}

export default BackButton;