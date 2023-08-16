const Zendesk = ({ license }) => {
  const script = document.createElement("script");
  script.innerHTML =
    `
      (function(){
        var checkExist = document.getElementById("ze-snippet");
        if(checkExist===null)
        {
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.id='ze-snippet';
            s1.src='https://static.zdassets.com/ekr/snippet.js?key=` +
    license +
    `';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            
            window.zESettings = {
                webWidget: {
                  offset: {
                    mobile: {
                      horizontal: '-20px',
                      vertical: '80px'
                    }
                  }
                }
              };
        }
      })();
      `;
  document.body.appendChild(script);
  return "";
};

export default Zendesk;
