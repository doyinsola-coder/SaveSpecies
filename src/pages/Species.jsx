import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, MapPin, Info, AlertCircle, Image as ImageIcon, Globe, Book } from "lucide-react";

export default function SpeciesSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [speciesData, setSpeciesData] = useState(null);
  const [error, setError] = useState("");

  const searchSpecies = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError("");
    setSpeciesData(null);

    try {
      // First, try to get suggestions/matches from GBIF (more flexible)
      const suggestResponse = await fetch(
        `https://api.gbif.org/v1/species/suggest?q=${encodeURIComponent(searchTerm)}&limit=5`
      );
      const suggestions = await suggestResponse.json();

      // If no suggestions, show error
      if (!suggestions || suggestions.length === 0) {
        setError(`No species found for "${searchTerm}". Try using the scientific name or check spelling.`);
        setLoading(false);
        return;
      }

      // Use the first (best) match
      const bestMatch = suggestions[0];
      const speciesKey = bestMatch.key;

      // Get detailed species information
      const detailsResponse = await fetch(
        `https://api.gbif.org/v1/species/${speciesKey}`
      );
      const detailsData = await detailsResponse.json();

      // Try to get Wikipedia data with multiple name variations
      let wikipediaData = null;
      const searchNames = [
        detailsData.canonicalName,
        detailsData.scientificName,
        bestMatch.canonicalName,
        searchTerm
      ].filter(Boolean);

      for (const name of searchNames) {
        try {
          const wikiResponse = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
          );
          if (wikiResponse.ok) {
            const data = await wikiResponse.json();
            if (data.extract && data.type !== 'disambiguation') {
              wikipediaData = data;
              break;
            }
          }
        } catch (err) {
          continue;
        }
      }

      // Get species images from GBIF
      const imagesResponse = await fetch(
        `https://api.gbif.org/v1/occurrence/search?taxonKey=${speciesKey}&mediaType=StillImage&limit=12`
      );
      const imagesData = await imagesResponse.json();
      
      // Extract and deduplicate images
      const images = imagesData.results
        ?.filter(r => r.media && r.media.length > 0)
        .flatMap(r => r.media.map(m => m.identifier))
        .filter((img, idx, arr) => arr.indexOf(img) === idx) // Remove duplicates
        .slice(0, 6) || [];

      setSpeciesData({
        scientificName: detailsData.canonicalName || detailsData.scientificName || bestMatch.scientificName,
        commonName: detailsData.vernacularName || bestMatch.vernacularNames?.[0] || "N/A",
        kingdom: detailsData.kingdom || "N/A",
        phylum: detailsData.phylum || "N/A",
        class: detailsData.class || "N/A",
        order: detailsData.order || "N/A",
        family: detailsData.family || "N/A",
        genus: detailsData.genus || "N/A",
        taxonomicStatus: detailsData.taxonomicStatus || "N/A",
        rank: detailsData.rank || bestMatch.rank || "N/A",
        description: wikipediaData?.extract || "No description available. Try searching on Wikipedia for more information.",
        thumbnail: wikipediaData?.thumbnail?.source || null,
        wikiUrl: wikipediaData?.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(detailsData.canonicalName || searchTerm)}`,
        images: images,
      });
    } catch (err) {
      console.error("Error fetching species data:", err);
      setError(`Failed to fetch information for "${searchTerm}". Please try again or use the scientific name.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-emerald-700 mb-3">
            Species Database
          </h1>
          <p className="text-gray-600 text-lg">
            Search for any species to learn about their classification, habitat, and conservation status
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <form onSubmit={searchSpecies} className="flex gap-3 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-600" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search species (e.g., Elephant, Panthera leo, Rose)..."
                className="w-full pl-12 pr-4 py-3 border-2 border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition disabled:bg-emerald-400 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Search"
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        {/* Results */}
        {speciesData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Hero Section */}
            <div className="relative h-64 bg-gradient-to-r from-emerald-500 to-green-600">
              {speciesData.thumbnail && (
                <img
                  src={speciesData.thumbnail}
                  alt={speciesData.commonName}
                  className="w-full h-full object-cover opacity-40"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-4xl font-bold mb-2">
                    {speciesData.commonName}
                  </h2>
                  <p className="text-xl italic opacity-90">
                    {speciesData.scientificName}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Description */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Book className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-bold text-emerald-700">
                    Description
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {speciesData.description}
                </p>
                {speciesData.wikiUrl && (
  <a
  href={speciesData.wikiUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
>
  <Globe className="w-4 h-4" />
  Read more on Wikipedia
</a>
)}
              </div>

              {/* Taxonomy */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-6 h-6 text-emerald-600" />
                  <h3 className="text-2xl font-bold text-emerald-700">
                    Scientific Classification
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Kingdom", value: speciesData.kingdom },
                    { label: "Phylum", value: speciesData.phylum },
                    { label: "Class", value: speciesData.class },
                    { label: "Order", value: speciesData.order },
                    { label: "Family", value: speciesData.family },
                    { label: "Genus", value: speciesData.genus },
                    { label: "Rank", value: speciesData.rank },
                    { label: "Status", value: speciesData.taxonomicStatus },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                      <p className="font-semibold text-emerald-700">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Images Gallery */}
              {speciesData.images.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ImageIcon className="w-6 h-6 text-emerald-600" />
                    <h3 className="text-2xl font-bold text-emerald-700">
                      Photo Gallery
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {speciesData.images.map((img, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="relative h-48 rounded-lg overflow-hidden shadow-md cursor-pointer bg-gray-100"
                      >
                        <img
                          src={img}
                          alt={`${speciesData.commonName} ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Images sourced from GBIF occurrence records
                  </p>
                </div>
              )}

              {/* Data Sources */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Data Sources:</strong> Global Biodiversity Information Facility (GBIF) & Wikipedia
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Info Cards */}
        {!speciesData && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                Comprehensive Search
              </h3>
              <p className="text-gray-600">
                Search by common name or scientific name to find detailed information about any species.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Info className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                Scientific Classification
              </h3>
              <p className="text-gray-600">
                Access complete taxonomic information from kingdom to species level.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-emerald-700 mb-2">
                Visual Resources
              </h3>
              <p className="text-gray-600">
                View photos and detailed descriptions from trusted sources.
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}