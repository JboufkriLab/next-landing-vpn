import { useEffect,useState } from 'react'
import generateHmac from '../utils/hmac'


const IntercomChat = ({ user }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {

    setIsClient(true);

    if (isClient) {
      // Load the Intercom library script
    
  

    if (user) {
      // Load the Intercom script
      alert('isclient');
      const intercomScript = document.createElement('script')
      intercomScript.setAttribute('id', 'intercom-script')
      intercomScript.setAttribute('async', '')
      intercomScript.setAttribute('src', 'https://widget.intercom.io/widget/t9scbaiq')
      document.head.appendChild(intercomScript)

      // Initialize Intercom with the user details
      //dqyS6Do7B6gsMD-LXEmIKerQhM9f0hHAAvNRY9pH
      window.intercomSettings = {
        app_id: 't9scbaiq',
        name: user.name,
        email: user.email,
        hmac : generateHmac(JSON.stringify(user)),
         hideDefaultLauncher: true,
      }
      
      window.Intercom('boot', { app_id: 't9scbaiq', hideDefaultLauncher: true })
     // window.Intercom('show');
  
    // document.head.removeChild(intercomScript);
    } 

  }
    // Unmount cleanup
    return () => {
      const intercomScript = document.getElementById('intercom-script')
      if (intercomScript) {
        document.head.removeChild(intercomScript);
        
      } 
    }
  }, [user])

  return   null;
}

export default IntercomChat
