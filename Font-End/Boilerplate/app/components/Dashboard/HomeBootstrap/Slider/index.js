import { CardMedia, Grid, makeStyles, IconButton } from '@material-ui/core';
import slider from 'content/images/slider_1.jpg';
import Slider from 'infinite-react-carousel';
import React from 'react';
import Slider_1 from './Image/slider_1.jpg';
import Slider_2 from './Image/slider_2.jpg';
import Slider_3 from './Image/slider_3.jpg';
import Slider_4 from './Image/slider_4.jpg';
import Slider_5 from './Image/slider_5.jpg';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

Silder.propTypes = {};

const useStyles = makeStyles(theme => ({
  root: {},
  slider: {
    cursor: 'pointer',
  },
}));

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  // const innerHeight = () => {
  //   let height = ;
  //   return height;
  // };

  return (
    <NavigateNextIcon
      className={className}
      style={{
        ...style,
        display: 'block',
        color: 'black',
        width: 30,
        height: 30,
        marginTop: window.innerHeight / 2 - 50,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <NavigateBeforeIcon
      className={className}
      style={{
        ...style,
        display: 'block',
        color: 'black',
        width: 30,
        height: 30,
        marginTop: window.innerHeight / 2 - 50,
      }}
      size="small"
      onClick={onClick}
    />
  );
}

function Silder(props) {
  const classes = useStyles();
  const settings = {
    autoplay: true,
    centerPadding: 40,
    dots: true,
    duration: 500,
    // shift: 30,
    //slidesToShow: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const handleOnclick = () => {
    console.log('hello');
  };
  const innerHeight = () => {
    return window.innerHeight;
  };
  return (
    <div>
      <section id="slider">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <Slider {...settings} className={classes.root}>
                <CardMedia
                  className={classes.slider}
                  component="img"
                  alt="Contemplative Reptile"
                  height={innerHeight}
                  image={slider}
                  title="Contemplative Reptile"
                  onClick={handleOnclick}
                />
                <CardMedia
                  className={classes.slider}
                  component="img"
                  alt="Contemplative Reptile"
                  height={innerHeight}
                  image={slider}
                  title="Contemplative Reptile"
                />
                <CardMedia
                  className={classes.slider}
                  component="img"
                  alt="Contemplative Reptile"
                  height={innerHeight}
                  image={slider}
                  title="Contemplative Reptile"
                />
                <CardMedia
                  className={classes.slider}
                  component="img"
                  alt="Contemplative Reptile"
                  height={innerHeight}
                  image={slider}
                  title="Contemplative Reptile"
                />
                <CardMedia
                  className={classes.slider}
                  component="img"
                  alt="Contemplative Reptile"
                  height={innerHeight}
                  image={slider}
                  title="Contemplative Reptile"
                />
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Silder;
