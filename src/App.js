import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";



import "./App.scss";


function App() {
  return (
    <div className='App'>
      <Container>
        <header>
          <div className='user'>
            <Avatar aria-label='recipe' className='avatar'>
              U
            </Avatar>
            <span className="name">Ellie Ye</span>
          </div>
        </header>

        <h1>Favourite Movies</h1>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <MovieCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}


function MovieCard() {
  return (
    <Card className='movie-card'>
      <CardActionArea>
        <CardMedia
          image='/static/images/cards/contemplative-reptile.jpg'
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            Lizard
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default App;
