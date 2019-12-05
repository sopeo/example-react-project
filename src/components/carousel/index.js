import React, { useState } from 'react';
import PropTypes from 'prop-types';

const posXs = [];
let isHold = false;
let lastX = 0;
let currentIndex = 0;
let friction = 20;

const Carousel = props => {
  const width = props.settings.width;
  const height = props.settings.height;
  friction = props.settings.friction || friction;

  props.children.forEach((_, i) => {
    posXs.push(width * i);
  });

  const initStyles = () => {
    let styles = {};
    props.children.forEach((_, i) => {
      styles[`${i}`] = {
        width: width,
        height: height,
        transform: `translate3d(${posXs[i]}px, 0px, 0px)`
      };
    });
    return styles;
  };

  const getStyle = x => {
    return {
      width: width,
      height: height,
      transform: `translate3d(${x}px, 0px, 0px)`
    };
  };

  const [styles, setStyles] = useState(initStyles());

  const handleMouseDown = () => {
    isHold = true;
  };

  const getCurrentIndex = index => {
    if (index < 0) {
      index = props.children.length + index;
    } else if (props.children.length - 1 < index) {
      index = index - props.children.length;
    }
    return index;
  };

  const handleMouseUp = () => {
    if (isHold) {
      isHold = false;
      let newStyles = {};
      currentIndex = getCurrentIndex(currentIndex - Math.floor(lastX / 20));
      props.children.forEach((_, i) => {
        posXs[i] = width * (i - currentIndex);
        newStyles[`${i}`] = getStyle(posXs[i]);
      });
      setStyles(newStyles);
    }
  };

  const handleMouseLeave = () => {
    if (isHold) {
      isHold = false;
      let newStyles = {};
      currentIndex = getCurrentIndex(currentIndex - Math.floor(lastX / 20));
      props.children.forEach((_, i) => {
        posXs[i] = width * (i - currentIndex);
        newStyles[`${i}`] = getStyle(posXs[i]);
      });
      setStyles(newStyles);
    }
  };

  const handleMouseMove = e => {
    if (isHold) {
      let newStyles = {};
      props.children.forEach((_, i) => {
        posXs[i] = posXs[i] + e.movementX;
        newStyles[`${i}`] = getStyle(posXs[i]);
      });
      setStyles(newStyles);
    }
    lastX = e.movementX;
  };

  const slideMove = (e, index) => {
    e.preventDefault();
    isHold = false;
    currentIndex = getCurrentIndex(index);
    let newStyles = {};
    props.children.forEach((_, i) => {
      posXs[i] = width * (i - currentIndex);
      newStyles[`${i}`] = getStyle(posXs[i]);
    });
    setStyles(newStyles);
  };

  return (
    <div className="Carousel__Container"
      style={{ width: width }}
      onMouseDown={ () => handleMouseDown() }
      onMouseUp={ () => handleMouseUp() }
      onMouseLeave={ () => handleMouseLeave() }
      onMouseMove={ e => handleMouseMove(e) }>
      <div className="Carousel__items" style={{ width: width, height: height }}>
        { props.children.map((item, i) => {
          return (<div className="Carousel__item" style={ styles[i] } key={ i }>{ item }</div>);
        }) }
      </div>
      <div className="Carousel__Arrow Carousel__Arrow--prev" onClick={ e => slideMove(e, currentIndex - 1) }></div>
      <div className="Carousel__Arrow Carousel__Arrow--next" onClick={ e => slideMove(e, currentIndex + 1) }></div>
      <div className="Carousel__Buttons">
        { props.children.map((_, i) => {
          return (<span className={ currentIndex === i ? 'Carousel__Button Carousel__Button--selected' : 'Carousel__Button' } key={ i } onClick={ e => slideMove(e, i) }></span>);
        }) }
      </div>
    </div>
  );
};

Carousel.propTypes = {
  settings: PropTypes.object,
  children: PropTypes.array
};

export default Carousel;
