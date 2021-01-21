import React from 'react';
import { Link } from 'react-router-dom';

export function CTSlider(props) {
  const { containerClass = '' } = props
  return (
    <React.Fragment>
      <div className={`swiper-container ${containerClass}`}>
        <div className="swiper-wrapper">
          {props.children}
        </div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </React.Fragment>
  )
}

export function CTSliderItem(props) {
  return (
    <React.Fragment>
      <div className="swiper-slide">
        <div className="slide-inner" style={{ backgroundImage: `url(${props.image})` }}>
          <div className="slide-caption">
            <h4 className="slide-title">{props.title}</h4>
            <p className="slide-text">{props.excerpt}</p>
            <Link to={props.link} className="btn btn-sm btn-outline-light">VIEW</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export function CTSliderItemNone(props) {
  return (
    <React.Fragment>
      <div className="swiper-slide none">{props.text}</div>
    </React.Fragment>
  )
}