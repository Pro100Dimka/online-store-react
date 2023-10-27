// Создайте функцию для декодирования Base64 в бинарные данные
function base64ToBinary(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

const fetchFileInfo = async (file) => {
  const fileData = JSON.parse(file);
  const binaryData = base64ToBinary(fileData.base64String);
  const blob = new Blob([binaryData], { type: fileData.type });
  const link = window.URL.createObjectURL(blob);
  const avatarFile = new File([blob], fileData.name);
  avatarFile.preview = link;
  return [avatarFile];
};
export default fetchFileInfo;
