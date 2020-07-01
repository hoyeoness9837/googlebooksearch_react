import React, { useState, useEffect } from 'react'
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

const Saved = () => {
  const classes = useStyles()

  const [gifState, setGifState] = useState({
    gifs: []
  })

  gifState.handleDeleteGif = gif => {
    axios.delete(`/api/gifs/${gif._id}`)
      .then(() => {
        const gifs = JSON.parse(JSON.stringify(gifState.gifs))
        const gifsFiltered = gifs.filter(giph => giph._id !== gif._id)
        setGifState({ ...gifState, gifs: gifsFiltered })
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    axios.get('/api/gifs')
      .then(({ data }) => {
        setGifState({ ...gifState, gifs: data })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      {
        gifState.gifs.map(gif => (
          <Card className={classes.root}>
            <CardHeader
              title={gif.title}
              subheader={gif.author.length ? `Created by ${gif.author}` : 'Creator unknown'}
            />
            <CardMedia
              className={classes.media}
              image={gif.source}
              title={gif.title}
            />
            <CardActions>
              <Button 
                size="small" 
                color="secondary"
                onClick={() => gifState.handleDeleteGif(gif)}>
                Delete
                </Button>
            </CardActions>
          </Card>
        ))
      }
    </div>
  )
}

export default Saved
