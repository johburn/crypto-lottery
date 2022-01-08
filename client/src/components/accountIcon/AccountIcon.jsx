import { useRef, useEffect } from "react";
import Jazzicon from "@metamask/jazzicon";

const AccountIcon = ({account}) => {
    const ref = useRef();
  
    useEffect(() => {
      if (account && ref.current) {
        ref.current.innerHTML = "";
        ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
      }
    }, [account]);
    
      return (<div ref={ref} className="h-full mx-1 rounded-t-3xl"></div>)
  }

export default AccountIcon