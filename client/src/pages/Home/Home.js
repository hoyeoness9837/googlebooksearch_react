import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

const Home = () => {
  const classes = useStyles()

  const [gifState, setGifState] = useState({
    search: '',
    gifs: []
  })

  gifState.handleInputChange = event => {
    setGifState({ ...gifState, [event.target.name]: event.target.value })
  }

  gifState.handleSearchGif = event => {
    event.preventDefault()
    axios.get(`/api/giphy/${gifState.search}`)
      .then(({ data }) => {
        console.log(data)
        setGifState({ ...gifState, gifs: data })
      })
      .catch(err => console.error(err))
  }

  gifState.handleSaveGif = gif => {
    axios.post('/api/gifs', {
      title: gif.title,
      source: gif.images.original.url,
      url: gif.url,
      author: gif.username,
      gifId: gif.id
    })
      .then(() => {
        const gifs = gifState.gifs
        const gifsFiltered = gifs.filter(giph => giph.id !== gif.id)
        setGifState({ ...gifState, gifs: gifsFiltered })
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <form onSubmit={gifState.handleSearchGif}>
        <TextField
          label="Search Giphy"
          name="search"
          value={gifState.search}
          onChange={gifState.handleInputChange} />
        <Button
          variant="outlined"
          color="primary"
          onClick={gifState.handleSearchGif}>
          Search
        </Button>
      </form>
      <div>
        {
          gifState.gifs.map(gif => (
            <Card className={classes.root}>
              <CardHeader
                title={gif.title}
                subheader={gif.username.length ? `Created by ${gif.username}` : 'Creator unknown'}
              />
                <CardMedia
                  className={classes.media}
                  image={gif.images.original.url}
                  title={gif.title}
                />
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => gifState.handleSaveGif(gif)}>
                  Save
                </Button>
                <Button size="small" color="primary" href={gif.url}>
                  View
                </Button>
              </CardActions>
            </Card>
          ))
        }
      </div>
    </>
  )
}

export default Home
