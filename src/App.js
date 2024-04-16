
import './App.css';

import { useState, useEffect } from 'react'

function App() {
  const [text, setText] = useState({ top: "", bottom: "" });
  const [imgURL, setImageURL] = useState("")
  const onTextChanged = (UpdatedText) => {
    setText({ ...text, ...UpdatedText })
  }

  async function fetchAPI() {
    try {
      const res = await fetch(`https://api.imgflip.com/get_memes`);
      const data = await res.json();
      if (data.success) {
        const memes = data.data.memes;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        setImageURL(randomMeme.url);
      } else {
        throw new Error('Failed to fetch memes');
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(function () {

    fetchAPI();
  }, [])
  const handlerGenerator = () => {
    fetchAPI()

  }
  return (
    <div className="App">
      <TextBox onTextChanged={onTextChanged}>Text</TextBox>

      <MemeImg text={text} src={imgURL} />
      <Button handlerGenerator={handlerGenerator}>Generate</Button>
    </div>
  );
}
function TextBox({ children = '', onTextChanged }) {
  return <div>
    <h1>{children}</h1>
    <label className="">{children}</label>
    <input type="text" onChange={((e) => onTextChanged({ top: e.target.value }))} />
    <input type="text" onChange={((e) => onTextChanged({ bottom: e.target.value }))} />
  </div>
}
function Button({ children, handlerGenerator }) {
  return <div className="container">
    <button onClick={handlerGenerator} className="btn">{children}</button>
  </div>
}
function MemeImg({ src = '', text }) {
  return <div className="container">
    <img src={src} alt="" />
    <h1 className="top-text">{text.top}</h1>
    <h1 className="bottom-text">{text.bottom}</h1>
  </div>
}
export default App;
