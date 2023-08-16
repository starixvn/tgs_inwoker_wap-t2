const Tawkto = ({ license }) => {
  const script = document.createElement("script");
  script.innerHTML =
    ` var Tawk_API = Tawk_API||{}, Tawk_LoadStart=new Date();
  
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/` +
    license +
    `';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();

    Tawk_API.customStyle = {
      visibility: {
        mobile: {
          position: 'br', 
          xOffset: 15,
          yOffset: 115,
        },
      }
    }


    `;
  document.body.appendChild(script);
  return "";
};

export default Tawkto;
