import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { API_KEY } from './constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTumblr, faTwitter } from '@fortawesome/free-brands-svg-icons';


function App() {
  const [count,setCount] = useState(0)
  const [color,setColor] = useState("");
  const [quote, setQuote] = useState({});
  useEffect(() => {
    axios.get(`https://api.api-ninjas.com/v1/quotes?X-Api-Key=${API_KEY}`).then(response => {
      setQuote(response.data[0]);
    }).catch(err => {
      console.error(err)
    })
  }, []);
  const changeQuote = () => {
    axios.get(`https://api.api-ninjas.com/v1/quotes?X-Api-Key=${API_KEY}`).then(response => {
      setQuote(response.data[0]);
    }).catch(err => {
      console.error(err)
    })
    setCount(count+1)
    if(count>8){
      setCount(0)
    }
    axios.get("https://random-flat-colors.vercel.app/api/random?count=10").then(response=>{
      setColor(response.data.colors[count])
    }).catch(err=>{
      console.error(err)
    });
  }
  return (
    <div className='App container-fluid' style={{color:`${color}`,backgroundColor:`${color}`}} >


      <div id="quote-box" className='quote-box container'>
        <h2 id="text"><FontAwesomeIcon icon={faQuoteLeft} /> {quote.quote}</h2>
        <p id="author">- {quote.author}</p>
        
          <button style={{backgroundColor:`${color}`}} className='twitter'><a href="twitter.com/intent/tweet" id="tweet-quote"><FontAwesomeIcon icon={faTwitter} /></a></button>
          <button style={{backgroundColor:`${color}`}} className="thumbler"><a href='https://www.tumblr.com/login'><FontAwesomeIcon icon={faTumblr} /></a></button>
          <button style={{backgroundColor:`${color}`}} onClick={() => { changeQuote() }} id='new-quote'>New Quote</button>
      </div>


    </div>
  );
}

export default App;
