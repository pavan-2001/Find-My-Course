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
import {fetchBooks, fetchPlaylist, fetchRatings} from './api';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Link from '@material-ui/core/Link';

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
    tabPlaylist : {
      marginLeft : `calc(1em + ${theme.spacing(80)}px)`,
      position : 'absolute',
      width : `calc(1em + ${theme.spacing(5000)}px)`,
   },
    rootBook: {
        flexGrow: 1,
        marginTop : `calc(1em + ${theme.spacing(5)}px)`,
      },
      paperBook: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
        backgroundColor : 'white'
      },
      imageBook: {
        width: 200,
        height: 200,
        '&:hoverZoom imgHover' : {
          transition: 'all 0.3s ease 0s',
          width: '200%',
        }
      },
      imageVideo: {
        width: 300,
        height: 200,
        '&:hoverZoom imgHover' : {
          transition: 'all 0.3s ease 0s',
          width: '200%',
        }
      },
      imgBook: {
        margin: 'auto',
        display: 'block',
        width : '100%',
        height : '100%'
      },
}));

export default function ContentPage() {
    const styles = useStyles();
    const [value, setValue] = useState(0);
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [videos, setVideos] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchItems = () => {
        setBooks([]);
        fetchBooks(search).then((result) => setBooks(result));
        setVideos([]);
        fetchPlaylist(search).then((result) => setVideos(result)); 
    };

    const booksList = books.map((d) => (
        <div className={styles.rootBook}>
      <Paper className={styles.paperBook}>
        <Grid container spacing={2}>
          <Grid item>
          <Link href={d.volumeInfo.previewLink} >
            <ButtonBase className={styles.imageBook}>
              <img className={styles.imgBook} alt="complex" src={d.volumeInfo.imageLinks['thumbnail']} />
            </ButtonBase>
            </Link>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {d.volumeInfo.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Authors : {d.volumeInfo.authors}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Publishers : {d.volumeInfo.publisher}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Subtitle : {d.volumeInfo.subtitle}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Published Date : {d.volumeInfo.publishedDate}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Page Count : {d.volumeInfo.pageCount}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Average Rating : {d.volumeInfo.averageRating}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
    ));
    const videosList = videos.map((d) => (
      <div className={styles.rootBook}>
    <Paper className={styles.paperBook}>
      <Grid container spacing={2}>
        <Grid item>
          <Link href={`https://www.youtube.com/watch?v=${d.id.videoId}`}>
          <ButtonBase className={styles.imageVideo}>
            <img className={styles.imgBook} alt="complex" src={d.snippet.thumbnails.high.url} />
          </ButtonBase>
          </Link>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5">
                {d.snippet.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
              {d.snippet.channelTitle}
              </Typography>
              <Typography variant="body2">
                {d.snippet.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </div>
  ));

    return (
        <div className={styles.parent}>
        <div className={styles.grow}>
            <AppBar className={styles.appBar}>
                <Toolbar>
                    <Typography className={styles.title} variant='h5' nopWrap>
                        <strong>Find My Course</strong>
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
        {videosList}
      </TabPanel>
      <TabPanel className={styles.tabContent} value={value} index={1}>
        {booksList}
      </TabPanel>
    </div>
    </div>
    );
}