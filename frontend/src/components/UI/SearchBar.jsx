import { useState, useEffect } from "react";
import API from "../../utils/api";
import { Search, X } from "lucide-react";


const SearchBar = ({ endpoint, placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

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
      setResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Search Error:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Select Result
  const handleSelect = (item) => {
    onSelect(item);
    setQuery("");
    setShowResults(true);
  };

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
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <X
            className="text-gray-500 cursor-pointer"
            size={20}
            onClick={() => setQuery("")}
          />
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-10">
          {loading ? (
            <p className="p-3 text-gray-500">Searching...</p>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
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
        <h2 className="text-lg font-semibold">Search </h2>
        <SearchBar
          endpoint={endpoint}
          placeholder={placeholder}
          onSelect={(item) => setSelectedItem(item)}
        />
      </div>

      {/* Search Result Display */}
      {selectedItem && (
        <div className="mt-4 p-4 border border-gray-300 rounded-lg">
          <h2 className="text-xl font-semibold">Selected </h2>
          <p><strong>Name:</strong> {selectedItem.name}</p>
          <p><strong>Price:</strong> ${selectedItem.price}</p>
        </div>
      )}
    </div>
  );
};


export default SearchBarDisplay;
