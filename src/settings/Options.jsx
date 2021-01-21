import * as GetAsset from 'utils/GetAsset';

const DomainEnv = (process.env.NODE_ENV === 'production') ? 'YOUR_DOMAIN' : 'http://localhost:PORT';
const Options = {
  appTitle : "ReactPress",
  appDescription : "ReactPress Website Platform Base.",
  appImage : GetAsset.AssetImage('ogimage.jpg'),
  appUrl : DomainEnv,
  appSubject : "ReactPress Base Site.",
  appAuthor : "Kaldi",
  appKeywords : "React,Wordpress",
  appEmail : "YOUR_EMAIL",
  appCopyright : "Copyright 2020 ReactPress Co. Ltd. All rights reserved.",
  appPublisher : "Kaldi",
  appDistribution : "Kaldi",
  appRobots : "noindex,nofollow",
};
export default Options;