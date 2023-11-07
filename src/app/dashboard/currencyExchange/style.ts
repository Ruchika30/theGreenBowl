import { styled } from '@mui/material/styles';


const style = {
    wrapperContainer: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1439,
        height: 910,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        display: 'flex',
    },


    StyledContainer : styled('section')({
        flex: '1',
        textAlign: 'left',
        padding: '5.25rem'
    }),

    StyledHistoryContainer : styled('section')(({ theme }) => ({
        backgroundColor: theme.palette.customColors.blueGray,
        flex: '1',
        textAlign: 'left',
        padding: '5.25rem'
    })),

    StyledTitle : styled('h1')({
        margin: '8px',
        fontWeight: 'bold'
    })

}

export default style