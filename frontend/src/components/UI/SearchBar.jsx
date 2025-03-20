import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import API from "../../utils/api";


const SearchBar = ({ endpoint, placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Debounce API Call to Optimize Performance
  useEffect(() => {
    if (query.length > 1) {
      const delay = setTimeout(() => fetchResults(query), 500);
      return () => clearTimeout(delay);
    } else {
      setResults([]);
    }
  }, [query]);

  // Fetch Search Results from API
  const fetchResults = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await API.get(`${endpoint}?q=${searchTerm}`);
      if (response.data.data) {
        setResults(response.data.data.slice(0, 10) || []); // Limit to 10 results
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    } catch (error) {
      console.error("Search Error:", error.response?.data || error);
      setResults([]);
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };

  // Handle Select Result
  const handleSelect = (item) => {
      if (onSelect) {
        onSelect(item);
      }
      setQuery("");
      setShowResults(true);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setShowResults(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  

    return (
      <div className="relative w-full max-w-md">
        {/* Search Input */}
        <div className="flex items-center border border-gray-300 rounded-lg bg-white px-3 py-2">
          <Search className="text-gray-500" size={20} />
          <input
            type="text"
            className="w-full text-black px-2 outline-none"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          {query && (
            <X
              className="text-gray-500 cursor-pointer"
              size={20}
              onClick={() => {
                setQuery("");
                setShowResults(false);
              }}
            />
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && results && (
          <div className="absolute w-full h-auto p-3 text-left bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-100">
            {loading ? (
              <p className="p-3 text-gray-500">Searching...</p>
            ) : (
              results.map((item) => (
                <div
                  key={item.id}
                  className="text-gray-500 p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  {item.name}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
};


const SearchBarDisplay = ({ endpoint, placeholder }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      {/* Search Bar for item */}
      <div className="mt-4 text-black">
        <SearchBar
          endpoint={endpoint}
          placeholder={placeholder}
          onSelect={(item) => setSelectedItem(item)}
        />
      </div>

      {/* Search Result Display */}
      {selectedItem && (
        <div className="mt-4 p-2.5 border text-left text-gray-400 border-gray-300 rounded-lg">
          {/* Details of selected item pop-up to be implemented */}
          <p><strong>Item</strong>: {selectedItem.name}</p>
          <p><strong>Price:</strong> ${selectedItem.price}</p>
        </div>
      )}
    </div>
  );
};


export default SearchBarDisplay;