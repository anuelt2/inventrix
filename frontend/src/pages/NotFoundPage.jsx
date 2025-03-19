import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom"

const NotFoundTemplate = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-6">
      <h1 className="text-9xl font-extrabold tracking-widest text-red-500 animate-pulse">
        404
      </h1>
      <p className="text-2xl text-gray-500 mt-4">Oops! The page you're looking for doesn't exist.</p>
      <p className="text-gray-500 mt-2">Maybe the URL is incorrect, or the page was moved.</p>
        <Link to="/"
         className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"    
        >
          Go Back Home
        </Link>
    </div>
  );
};


const NotFoundPage = () => {
    return (
        <Layout>
            <NotFoundTemplate />
        </Layout>
    )
}

export default NotFoundPage;
