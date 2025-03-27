import { ThreeDots } from "react-loader-spinner";

const LoadingWrapper = ({ loading, children }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <ThreeDots height="80" width="80" color="#4F46E5" />
      </div>
    );
  }

  return children;
};

export default LoadingWrapper;
