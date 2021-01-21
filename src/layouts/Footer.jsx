import React from 'react';
import Options from 'settings/Options';

export default function Footer(props) {

  const appDescription = Options.appDescription;
  
  return (
    <React.Fragment>
      <footer className="footer">
        <p>{appDescription} © 2021 KaldiLab.</p>
      </footer>
    </React.Fragment>
  )

}