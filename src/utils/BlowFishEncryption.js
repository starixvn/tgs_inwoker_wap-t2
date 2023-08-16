function Encrypt(str) {}
function Decrypt(str) {}
function Base64toHex(str) {
  for (
    var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = [];
    i < bin.length;
    ++i
  ) {
    let tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = "0" + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join("");
}
function HexToBase64(str) {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .toUpperCase()
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(/ +$/, "")
        .split(" ")
    )
  );
}

const BlowFishEncryption = {
  Decrypt,
  Base64toHex,
  HexToBase64,
  Encrypt,
};
export default BlowFishEncryption;
