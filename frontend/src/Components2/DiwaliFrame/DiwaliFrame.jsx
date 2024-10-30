import './DiwaliFrames.css'; 
import image1 from '../frames/frame1.png';
import image2 from '../frames/frame2.jpg'
import image3 from '../frames/frame 3.png'
// eslint-disable-next-line react/prop-types
const DiwaliFrames = ({ selectedFrame, onSelectFrame }) => {
  const frames = [
    {
      id: 'frame1',
      image: image1, 
      title: 'Happy Diwali!',
      description: 'Wishing you a joyous Diwali filled with light and happiness.',
    },
    {
      id: 'frame2',
      image: image2, 
      title: 'Shubh Deepavali!',
      description: 'May this Diwali bring prosperity and joy to your life.',
    },
    {
      id: 'frame3',
      image: image3, 
      title: 'Festival of Lights!',
      description: 'Celebrate the festival with joy and enthusiasm.',
    },
  ];

  return (
    <div className="frame-selection">
      {frames.map((frame) => (
        <div
          key={frame.id}
          className={`frame-option ${selectedFrame === frame.id ? 'selected' : ''}`}
          onClick={() => onSelectFrame(frame.id)}
        >
          <div className="frame-info">
            <h2 className="frame-title">{frame.title}</h2>
            <p className="frame-description">{frame.description}</p>
            <img src={frame.image} className='frame-info-image' alt={`${frame.title} image`} />
          </div>
          {selectedFrame === frame.id && <div className="checkmark">✔️</div>}
        </div>
      ))}
    </div>
  );
};

export default DiwaliFrames;
