import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function CheckboxInputBtn(props) {
    // const [other,setOther]=useState("Others")
    const handleOther=(e)=>{
        props.setOtherOption(e.target.value)
    }

    const handleOnClick=()=>{
        props.setOption({...props.options,Others:true})
    }
    
    return (
        <FormControlLabel
            control={<Checkbox
                checked={props.options.Others}
                name="Others"
            onChange={(event)=>{props.setOption({...props.options,[event.target.name]:event.target.checked})}}
            />}
            label={<TextField label="Others" 
            onClick={handleOnClick}
            onChange={handleOther}
            />}
        />
    )
}