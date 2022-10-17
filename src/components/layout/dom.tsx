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
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 10,
        overflow: "hidden",
      }}
      ref={ref}
    >
      {/* <div>
        <h1>Testing</h1>
        <p>Testing more.</p>
        <h1>Testing</h1>
        <p>Testing more.</p>
        <h1>Testing</h1>
        <p>Testing more.</p>
        <h1>Testing</h1>
        <p>Testing more.</p>
      </div> */}
      {children}
    </div>
  );
};

export default Dom;
