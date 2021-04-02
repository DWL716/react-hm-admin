import { useCallback, useEffect, useState } from "react";

const useKeyPress = (targetKeyCode: number) => {
  const [keyPress, setKeyPress] = useState(false);
  // const keyDownHandle = useCallback(({keyCode}) => {
  //   if(keyCode === targetKeyCode) {
  //     setKeyPress(false)
  //   }
  // }, [targetKeyCode])

  const keyUpHandle = useCallback(({keyCode}) => {    
    if(keyCode === targetKeyCode) {
      
      setKeyPress(!keyPress)
    }
  }, [keyPress, targetKeyCode])

  useEffect(() => {
    // document.addEventListener("keydown", keyDownHandle)
    document.addEventListener("keyup", keyUpHandle)
    return () => {
      // document.removeEventListener("keydown", keyDownHandle)
      document.removeEventListener("keyup", keyUpHandle)
    }
  }, [keyUpHandle]);

  return keyPress;
}

export default useKeyPress;