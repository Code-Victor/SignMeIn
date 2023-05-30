import React,{useState} from "react";
import "./App.css";
import { QrReader } from "react-qr-reader";

function App() {
   const [data, setData] = useState('No result');
  return (
    <div>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            // @ts-ignore
            setData(result?.text);
          }

          if (error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      />
      <p>{data}</p>
    </div>
  );
}

export default App;
