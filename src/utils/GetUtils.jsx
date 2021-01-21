import queryString from 'query-string';
import * as GetAsset from 'utils/GetAsset';

// GetParse
export function GetParse(type, data) {
  if (type === 'query') {
    return queryString.parse(data);
  } else if (type === 'json') {
    return JSON.parse(data);
  }
}

// GetStringfy
export function GetStringfy(type, data) {
  if (type === 'query') {
    return queryString.stringify(data);
  } else if (type === 'json') {
    return JSON.stringify(data);
  }
}

// GetMarkup
export function GetMarkup(markup) {
  return { __html: markup };
}

// GetMarkupRemove
export function GetMarkupRemove(string) {
  const removeTagRegex = /(<([^>]+)>)/ig;
  return string.replace(removeTagRegex, '');
}

// GetByDay
export function GetByDay(day = 0) {
  const date = new Date(
    new Date().setDate(new Date().getDate() + day)
  );
  return date;
}

// GetTimestamp
export function GetTimestamp(time, when = new Date()) {
  const date = when;
  if (time === 'date') {
    return date.setHours(0, 0, 0, 0);
  } else if (time === 'time') {
    return date.getTime();
  }
}

// GetEllipsis
export function GetEllipsis(text, length, lastText) {
  if (length === "" || length === null) {
    length = 100;
  }
  if (lastText === "" || lastText === null) {
    lastText = "...";
  }
  if (text.length > length) {
    text = text.substr(0, length) + lastText;
  }
  return text;
}

// GetGoto
export function GetGoto(link) {
  return window.location.href = (process.env.PUBLIC_URL + link);
}

// GetEmbed
export function GetEmbed(getEmbedded, name, type) {
  const getTerm = 'wp:term' in getEmbedded;
  const getFeaturedMedia = 'wp:featuredmedia' in getEmbedded;
  if (name === 'category') {
    const isType = (type === 'cpt') ? 1 : 0;
    return (getTerm) && getEmbedded['wp:term'][isType];
  } else if (name === 'tag') {
    const isType = (type === 'cpt') ? 0 : 1;
    return (getTerm) && getEmbedded['wp:term'][isType];
  } else if (name === 'image') {
    return (getFeaturedMedia) ? getEmbedded['wp:featuredmedia'][0].source_url : GetAsset.AssetImage('default.jpg');
  } else if (name === 'author') {
    return getEmbedded['author'][0].name;
  }
}

// GetTitleCase
export function GetTitleCase(string) {
  if (typeof string !== 'string') return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}