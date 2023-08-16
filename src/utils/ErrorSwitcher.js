var translation = {};

const ErrorSwitcher = {
  translation,
  setTranslation: (data) => {
    translation = data;
  },
  getTranslation: (msgid) => {
    return translation[msgid] ? translation[msgid] : msgid;
  },
};
export default ErrorSwitcher;
