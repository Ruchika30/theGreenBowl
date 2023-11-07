
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const style = {
    CustomInput: styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(1),
        },
        '& .MuiInputBase-input': {
            height:'50px',
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
           
        },
    })),

  

    Asterisk : styled('span')(({ theme }) => ({
        color: theme.palette.primary.main,
        marginLeft: '2px', 
    })),

}

export default style