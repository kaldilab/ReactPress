import React from 'react';
import $ from 'jquery';

export function CTCarousel(props) {
  const { containerClass = 'carousel-slider' } = props
  $(function () {
    $('.carousel-slider').carousel();
  });
  return (
    <React.Fragment>
      <div id="carouselSlider" className={`carousel slide ${containerClass}`} data-ride="carousel">
        <div className="carousel-inner">
          {props.children}
        </div>
        <a className="carousel-control-prev" href="#carouselSlider" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselSlider" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </React.Fragment>
  )
}

export function CTCarouselItem(props) {
  const { itemClass = '' } = props
  return (
    <React.Fragment>
      <div className={`carousel-item ${itemClass}`}>
        <img src={props.image} className="d-block w-100" alt={props.title} />
        <div className="carousel-caption">
          <h5>{props.title}</h5>
          <p className="d-none d-md-block">{props.excerpt}</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export function CTSliderItemNone(props) {
  return (
    <React.Fragment>
      <div className="carousel-item none">{props.text}</div>
    </React.Fragment>
  )
}