export function AssetImage(filename) {
  const ObjectImages = images(require.context('assets/images', true));
  const ArrayImages = Object.keys(ObjectImages).map(item =>
    ({
      'file': item,
      'url': ObjectImages[item].default,
    })
  );
  const image = ArrayImages.filter(item => (item.file === filename));
  const imageUrl = image[0].url;
  return imageUrl;

  function images(source) {
    const images = {};
    source.keys().map(item =>
      images[item.replace('./', '')] = source(item)
    );
    return images;
  }
}

export function AssetVideo(filename) {
  const ObjectVideos = videos(require.context('assets/videos', true));
  const ArrayVideos = Object.keys(ObjectVideos).map(item =>
    ({
      'file': item,
      'url': ObjectVideos[item].default,
    })
  );
  const video = ArrayVideos.filter(item => (item.file === filename));
  const videoUrl = video[0].url;
  return videoUrl;

  function videos(source) {
    const videos = {};
    source.keys().map(item =>
      videos[item.replace('./', '')] = source(item)
    );
    return videos;
  }
}