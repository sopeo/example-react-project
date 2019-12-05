import React from 'react';
import Carousel from './components/carousel';

export default function app() {
  const settings = {
    width: window.innerWidth,
    height: 100
  };
  return (
    <div className="App">
      <Carousel settings={ settings }>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
      </Carousel>
    </div>
  );
}
