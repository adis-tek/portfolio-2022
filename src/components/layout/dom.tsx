import useStore from "@/helpers/store";
import { useEffect, useRef } from "react";

const Dom = ({ children }) => {
  const ref = useRef(null);
  // useEffect(() => {
  //   useStore.setState({ dom: ref })
  // }, [])

  return (
    <div
      className="dom"
      style={{
        position: "relative",
        top: 0,
        left: 0,
        zIndex: 10,
        overflow: "hidden",
      }}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Dom;
