
import './HomePage.css';
import { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import DiwaliFrames from '../DiwaliFrame/DiwaliFrame';

const HomePage = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [frame, setFrame] = useState('frame1');
  const [loading, setLoading] = useState(false);
  const [uniqueUrl, setUniqueUrl] = useState(''); 
//   const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('message', message);
    formData.append('frame', frame);

    try {
        const response = await axios.post('http://localhost:5000/api/create-greeting', formData);
        setUniqueUrl(response.data.uniqueUrl); 
    } catch (error) {
        console.error('Error creating greeting:', error);
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="container">
    
      <div className="title">Happy Diwali</div>

      <ul className="fireworks">
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
        <li><span></span></li>
      </ul>


      <div className="greeting-container">
        <h1 className="greeting-title">
        <span className="word word-1">Create</span>
        <span className="word word-2">Your</span>
        <span className="word word-3"> Greeting</span>

        </h1>
        <form onSubmit={handleSubmit} className="greeting-form">
          <div className="form-group">
            <label>Upload Your Photo</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="file-input"
            />
          </div>
          <div className="form-group">
            <label>Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input"
            />
          </div>
          <div className="form-group">
                <label>Choose Frame</label>
                <DiwaliFrames selectedFrame={frame} onSelectFrame={setFrame} />
        </div>
          <button 
            type="submit" 
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Creating...' : 'Create Greeting'}
          </button>
        </form>
            {uniqueUrl && (
                        <div className="generated-url">
                            <p>Your greeting is ready! Access it here:</p>
                            <a href={`/greeting/${uniqueUrl}`} target="_blank" rel="noopener noreferrer">
                                {`/greeting/${uniqueUrl}`}
                            </a>
                        </div>
                    )}
      </div>
    </div>
  );
};

export default HomePage;
