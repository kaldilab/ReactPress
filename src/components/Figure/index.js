import React from 'react';

export function CTFigure(props) {
  const { figureClass = '' } = props;
  const { imageClass = '' } = props;
  const { captionClass = '' } = props;
  return (
    <React.Fragment>
      <figure className={`figure ${figureClass}`}>
        <img src={props.image} className={`figure-img img-fluid rounded ${imageClass}`} alt={props.alt} />
        <figcaption className={`figure-caption ${captionClass}`}>{props.caption}</figcaption>
      </figure>
    </React.Fragment>
  )
}