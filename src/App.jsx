import { useState, useEffect , useCallback , useRef} from "react";

function App() {
  const [length, setLength] = useState(5);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");

  // use callback to make it the optimized way
const generatePassword = useCallback(() => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+{}:<>?";

    let pass = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      pass += chars[randomIndex];
    }
    setPassword(pass);
  }, [length, includeNumbers, includeSymbols , setPassword]); // this is wriiten where to optimize and store in cache
  // 👆 dependencies: function re-created only when these change


  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSymbols , generatePassword]); // inmai sa koi bhi change ho to phirse run kar do
const passwordRef = useRef(null);

const CopyToClipboard = () => {
  if (passwordRef.current) {
    // Select the text inside input
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 99999); // for mobile devices

    // Copy to clipboard
    navigator.clipboard.writeText(passwordRef.current.value)
      .then(() => {
        alert("Password copied! ✅");
      })
      .catch(() => {
        alert("Failed to copy ❌");
      });
  }
};

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#000" }}>
      <div style={{ background: "#1e293b", padding: "20px", borderRadius: "10px", color: "white", width: "400px" }}>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <input
            type="text"
            value={password}
            readOnly
            ref = {passwordRef}
            style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "none", marginRight: "10px" }}
          />
          <button onClick={CopyToClipboard} style={{ background: "#3b82f6", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Copy
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <span style={{ marginLeft: "10px", color: "orange" }}>Length ({length})</span>
        </div>

        <div>
          <label style={{ marginRight: "15px", color: "orange" }}>
            <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(prev => !prev  )} /> Numbers
          </label>
          <label style={{ color: "orange" }}>
            <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} /> Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;