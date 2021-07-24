import React, { useEffect } from "react";

const Alert = ({ msg, type, removeAlert,items }) => {
  useEffect(()=> {
   const timeout= setTimeout(() => {
     removeAlert();
   }, 2000);
   return ()=> clearTimeout(timeout);
  }, [items]);
  return <div className={`alert ${type}`}>{msg}</div>;
};

export default Alert;
