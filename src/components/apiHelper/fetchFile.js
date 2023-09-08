const fetchFileInfo = async (url) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], url.substring(url.lastIndexOf('/') + 1), {
      type: blob.type,
      lastModified: blob.lastModified,
    });
    return [file];
  } catch (error) {
    console.error('Error fetching file info:', error);
    return null;
  }
};
export default fetchFileInfo;
