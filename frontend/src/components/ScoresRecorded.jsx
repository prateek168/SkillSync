import { useNavigate } from "react-router-dom";

const ScoresRecorded = ({token}) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Test Completed
        </h2>
        <p className="text-lg text-gray-600 mb-2">
        Your test has ended and your scores have been recorded.
        </p>
        <p className="text-lg text-gray-600">
        You will soon get to know your results.
        </p>
        <ul className="list-disc list-inside text-lg text-gray-600 mt-2">
          <p>You will be notified via email about your selection status</p>
          <button className='text-purple-700 underline' onClick={()=> {navigate('/')}}>Login</button>
        </ul>
      </div>
    </div>

    );
}

export default ScoresRecorded;
