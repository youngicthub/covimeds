import React, { useEffect } from 'react';

const LiveChat = () => {
  useEffect(() => {
    // Ensure Smartsupp is initialized correctly
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = 'd5d22d2e05b10027717a1b0472e5a0769adfeced';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://www.smartsuppchat.com/loader.js';
    script.charset = 'utf-8';

    script.onload = () => {
      console.log("Smartsupp script loaded successfully");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default LiveChat;
