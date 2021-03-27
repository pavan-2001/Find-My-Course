import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import SearchButton from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {fetchBooks} from './api';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-prevent-tabpanel-${index}`}
        aria-labelledby={`scrollable-prevent-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-prevent-tab-${index}`,
      'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
  }

const useStyles = makeStyles((theme) => ({
    grow : {
        flexGrow : 1, 
    },
    appBar : {
        backgroundColor : 'black'
    },
    title : {
        position : 'absolute',
        display : 'none', 
        [theme.breakpoints.up('sm')] : {
            display : 'block',
        },
    },
    search : {
        position : 'relative',
        borderRadius : theme.shape.borderRadius,
        backgroundColor : fade(theme.palette.common.white, 0.15),
        '&:hover' : {
            backgroundColor : fade(theme.palette.common.white, 0.25)
        },
        width : `calc(1em + ${800}px)`, 
        [theme.breakpoints.up('sm')] : {
            marginLeft : `calc(1em + ${theme.spacing(40)}px)`,
            marginRight : `calc(1em + ${theme.spacing(10)}px)`, 
            width : '30',
        },
    },
    searchButton : {
        color : 'white',
        height : '100%', 
        position : 'end',
        '&:hover' : {
            backgroundColor : fade(theme.palette.common.white, 0.25)
        },
        marginLeft : `calc(1em + ${theme.spacing(6)}px)`,
    },
    inputRoot : {
        color : 'inherit',
    },
    inputInput : {
        padding : theme.spacing(1,1,1,0),
        paddingLeft : `calc(1em + ${theme.spacing(5)}px)`, 
        transition : theme.transitions.create('width'),
        width : '100%', 
        [theme.breakpoints.up('md')] : {
            width : '70ch',
        },
        color : 'white'
    },  
    tabsRoot : {
        flexGrow: 1,
        width : '100%',
        marginTop : `calc(1em + ${theme.spacing(6)}px)`, 
        position : 'absolute',
    },
    tabBar : {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        width: `calc(1em + ${100})`,
        position : 'relative',
    }, 
    tabYouTube: {
        position : 'absolute',
        marginLeft : `calc(1em + ${theme.spacing(40)}px)`,
        marginRight : `calc(1em + ${theme.spacing(30)}px)`,
        width : `calc(1em + ${theme.spacing(100)}px)`
    }, 
    tabBooks : {
        marginLeft : `calc(1em + ${theme.spacing(120)}px)`,
        position : 'absolute',
        width : `calc(1em + ${theme.spacing(5000)}px)`,
    },
    tabContent : {

    }
}));

export default function ContentPage() {
    const styles = useStyles();
    const [value, setValue] = useState(0);
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchItems = () => {
        fetchBooks(search).then((result) => setBooks(result));
    };
    const listItems = books.map((d) => (
        <li key={d.volumeInfo.title}>
            {d.volumeInfo.title}
        </li>
    ));

    return (
        <div className={styles.parent}>
        <div className={styles.grow}>
            <AppBar className={styles.appBar}>
                <Toolbar>
                    <Typography className={styles.title} variant='h5' nopWrap>
                        Find My Course
                    </Typography>
                    <div className={styles.search} >
                        <InputBase
                            placeholder='Search For Courses...'
                            classes={{
                                root : styles.inputRoot,
                                input: styles.inputInput
                            }}
                            inputProps={{
                                'aria-label' : 'search'
                            }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            endAdornment={<IconButton className={styles.searchButton} onClick={fetchItems}>
                            <SearchButton/>
                        </IconButton>}
                        />
                        
                    </div>
                </Toolbar>
            </AppBar>
        </div>
        <div className={styles.tabsRoot}>
      <AppBar position="relative" className={styles.tabBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab className={styles.tabYouTube} icon={<YouTubeIcon/>} aria-label="phone" {...a11yProps(0)} />
          <Tab className={styles.tabBooks} icon={<MenuBookIcon />} aria-label="favorite" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel className={styles.tabContent} value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel className={styles.tabContent} value={value} index={1}>
        {listItems}
      </TabPanel>
    </div>
    </div>
            
    );
}