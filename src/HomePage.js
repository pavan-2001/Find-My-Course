import React,{useState, useEffect, Fragment} from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {fetchQuote} from './api';
import Grid from '@material-ui/core/Grid';
import ParticlesBg from 'particles-bg';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center' ,
    }, 
    projectName : {
        color : '#eeeeee',
        fontSize : 100,   
        textAlign : 'center'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(39),
          width: '60%', 
          height : 40,
          marginTop : theme.spacing(0), 
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      searchRoot: {
        color: 'inherit',
      },
      searchInput: {
        color : 'white',
        padding: 'auto',
        // vertical padding + font size from searchIcon
        paddingLeft : theme.spacing(10),
        paddingTop : theme.spacing(1.5),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '90ch',
        },
      },
      quoteClass : {
        flexGrow: 1,
        justifyContent : 'center', 
        margin : 'auto', 
        marginLeft : theme.spacing(60), 
        marginRight : theme.spacing(30), 
        marginTop : theme.spacing(2),
        fontFamily: 'Pacifico ,cursive', 
      }, 
      quote : {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor : '',
        color : '#f5f5f5', 
        fontSize : 30, 
        fontFamily: 'Pacifico ,cursive', 
      }, 
      quoteAuthor : {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor : 'black',
        color : '#e1bee7', 
        fontSize : 30, 
      } , 
      divider : {
        color : '#fafafa', 
        margin : 'auto', 
        marginTop : theme.spacing(15), 
        width : '75%', 
        marginBottom : theme.spacing(5),
        backgroundColor : 'white', 
      }, 
}));


export default function HomePage() {
    
    const [searchValue, setSearchValue] = useState('');
    const styles = useStyles();
    const [quoteNumber, setQuoteNumber] = useState(0);
    const [currentQuote, setCurrentQuote] = useState({quote : '“Experience is the name everyone gives to their mistakes.”',
    author : 'Oscar Wilde'});

      useEffect(() => {
          setTimeout(() => {
            fetchQuote(quoteNumber).then((quote) => {
              setCurrentQuote(quote);
            });
          setQuoteNumber(quoteNumber >= 14 ? 0 : quoteNumber + 1);
          }, 15000);
      }, [quoteNumber]);

    return(
        <Fragment>
        <div className={styles.root}>
        <div className={styles.projectName} >
            <Grid container>
              <Grid item xs={12}>
              <p><strong>Find My Course</strong></p>
              </Grid>
            </Grid>
          </div>
            <div className={styles.search} >
                <div className={styles.searchIcon} >
                    <SearchIcon/>
                </div>
                <InputBase
                    placeholder = 'Search For Courses...'
                    classes = {{
                        root : styles.searchRoot, 
                        input : styles.searchInput
                    }}
                    inputProps = {{'aria-label' : 'search'}}
                    value = {searchValue}
                    onChange={(e) => (setSearchValue(e.target.value))}
                />
            </div>
            <div className={styles.quoteClass} >
            <Grid container spacing={3}>  
                <Grid item xs={8} >
                    <p className={styles.quote} >{currentQuote.quote}</p>
                    <p className={styles.quote} >- {currentQuote.author}</p>
                </Grid>
            </Grid>
            </div>
            <Grid container >
                <Grid item xs={12} >
                <Divider className={styles.divider}/>
                </Grid>
            </Grid>
        </div>
        <ParticlesBg type='custom' opacity={0} bg={true} />
        </Fragment>
    );
}