import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    login: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    form2: {
        width: '100%',
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
    },
    videoRoom: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'row',
    },
    chatApp: {
        flexBasis: 0,
        flexGrow: 3,
        maxWidth: '25%',
        height: 'calc(120vh - 300px)',
        border: '1px solid #E0E0E0',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    },
    chatHeader: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(1),
        borderBottom: '1px solid #E0E0E0',
        height: '6%',
        background: '#E3E3E3',
        fontSize: '80%',
    },
    displayMessage: {
        background: '#F9F9F9',
        overflowY: 'scroll',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',

        height: '90%',
        paddingLeft: '3%',
        paddingRight: '3%'
    },
    typingSection: {
        height: '4%',
    },
    formControl: {
        width: '100%',
        height: '90%',
        fontSize: '90%',
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    videoPlayer: {
        flexGrow: 10,
        textAlign: 'center'
    },
    searchBar: {
        width: '60%'
    },
    userList: {
        flexBasis: 0,
        flexGrow: 2,
        height: 'calc(75vh - 300px)',
        maxWidth: '15%',
        border: '1px solid #E0E0E0',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',

        overflow: 'hidden',
        display: 'inline-block',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    userListHeader: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        background: '#E3E3E3',
        borderBottom: '1px solid #E0E0E0',
        height: '10%',
        fontSize: '80%',
    },
    userListContent: {
        background: '#F9F9F9',
        overflowY: 'scroll',
        height: '90%',
        padding: '0%',
    },
    user: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        minWidth: 0,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default useStyles;