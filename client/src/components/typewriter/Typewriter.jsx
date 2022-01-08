import Typed from "typed.js";
import { useEffect, useRef } from "react";

const Typewriter = ({text, clasProps}) => {

    const el = useRef(null);
    useEffect(() => {
        const typed = new Typed(el.current, {
          strings: text,
          startDelay: 300,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 200,
          smartBackspace: true,
          loop: true,
          showCursor: false,
          cursorChar: '_'
        });
    
        return () => {
          typed.destroy();
        };
      }, []);

    return (
        <p ref={el} className={`${clasProps}`}></p>
    )
}

export default Typewriter;