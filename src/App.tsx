import { useState, ChangeEventHandler } from "react";
import { deflateRaw } from "pako";

function App() {
  const [size, setSize] = useState(0);
  const [compressSize, setCompressSize] = useState(0);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.[0];

    if (file) {
      file
        .arrayBuffer()
        .then(buffer => {
          const compressBuffer = deflateRaw(buffer, {
            level: 9,
          });

          setSize(buffer.byteLength);
          setCompressSize(compressBuffer.buffer.byteLength);
        })
        .catch(e => alert(e?.message));
    }
  };

  return (
    <div className="w-screen h-screen bg-base-100 text-center flex flex-col items-center justify-around">
      <h1 className="text-6xl font-bold font-mono">pako</h1>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={handleFileChange}
      />
      <div>
        <div className="mt-4">压缩前尺寸：{size}</div>
        <div className="mt-4">压缩后尺寸：{compressSize}</div>
      </div>
    </div>
  );
}

export default App;
