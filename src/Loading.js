import './Loading.css';
import { HashLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="loading_container">
      <HashLoader color="#36d7b7" speedMultiplier={2} />
    </div>
  );
};

export default Loading;
