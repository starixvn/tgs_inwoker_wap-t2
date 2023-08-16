import { copyImageToClipboard } from "copy-image-clipboard";

function imagePathGenerator(path) {
  return `${process.env.PUBLIC_URL}/assets/images/${path}`;
}

export function copy(item) {
  try {
    navigator.clipboard.writeText(item);
  } catch (e) {
    console.log(e.message);
  }
}
export function copyImage(image) {
  copyImageToClipboard(image)
    .then(() => {
      console.log("Image Copied");
    })
    .catch((e) => {
      console.log("Error: ", e.message);
    });
}
export function downloadImage(url, name) {
  fetch(url)
    .then((resp) => resp.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((e) => console.log("Error: " + e.message));
}

function removeSpace(str) {
  return str && str.replace(/^\s+|\s+$/g, "");
}

export const utility = {
  imagePathGenerator,
  copy,
  copyImage,
  downloadImage,
  removeSpace,
};
