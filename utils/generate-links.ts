export const copyImage = (imagesUrl: string) => {
  navigator.clipboard.writeText(imagesUrl);
};
export const copyHtml = (imagesUrl: string) => {
  const link = `<img src="${imagesUrl}" alt="Image" />`;
  copyImage(link);
};
