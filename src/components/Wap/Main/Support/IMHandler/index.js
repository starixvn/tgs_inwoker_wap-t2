const IMHandler = (social, id) => {
  switch (social) {
    case 'KakaoTalk':
      return
    case 'Line': //
      return window.open(`https://line.me/ti/p/~/${id}`, '_blank')
    case 'Skype':
      return window.open(`skype:${id}?chat`, '_blank')
    case 'Telegram': //
      return window.open(`https://t.me/${id}`, '_blank')
    case 'Viber':
      return window.open(`https://viber.me/${id}`, '_blank')
    case 'WeChat': //not supported
      return
    case 'WhatsApp': //
      return window.open(`https://wa.me/${id}`, '_blank')
    case 'Zalo':
      return window.open(`https://zalo.me/${id}`, '_blank')
    default:
      return
  }
}

export default IMHandler
