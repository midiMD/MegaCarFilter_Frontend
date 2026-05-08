import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react';

const mockImages = [
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
  'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800',
  'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800',
  'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800',
];

const motHistory = [
  { year: '2024', passed: true, mileage: 45120, date: 'March 15, 2024' },
  { year: '2023', passed: true, mileage: 38450, date: 'March 20, 2023' },
  { year: '2022', passed: false, mileage: 32100, date: 'March 18, 2022' },
  { year: '2021', passed: true, mileage: 25800, date: 'March 22, 2021' },
];

export function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedMot, setExpandedMot] = useState<string | null>(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mockImages.length) % mockImages.length);
  };

  const handleHide = () => {
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto pt-16 pb-8">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
        <button
          onClick={handleHide}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <X size={20} />
          Hide from list
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="relative mb-6">
            <img
              src={mockImages[currentImageIndex]}
              alt="Car"
              className="w-full h-96 object-cover rounded-md"
            />
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {mockImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="mb-2">AI Advice</h3>
            <p className="text-gray-700">
              This vehicle appears to be in good condition based on the MOT history and mileage. The service history is consistent, and there are no major red flags. The price is competitive for the market. Consider arranging a professional inspection before purchase, and verify all service records are complete.
            </p>
          </div>

          <h2 className="text-2xl mb-2">2018 BMW 320d M Sport</h2>
          <p className="text-xl text-gray-600 mb-1">£18,500</p>
          <p className="text-gray-500 mb-6">London</p>

          <div className="mb-8">
            <h3 className="text-xl mb-4">MOT History</h3>

            <h4 className="mb-2">Summary</h4>
            <p className="text-gray-700 mb-6">
              The vehicle has a mostly clean MOT history with 4 passes and 1 failure over the last 5 years. The most recent test was passed without any advisories. Overall, the vehicle shows good maintenance records.
            </p>

            <h4 className="mb-3">History</h4>
            <div className="space-y-2">
              {motHistory.map((mot) => (
                <div key={mot.year} className="border border-gray-200 rounded-md">
                  <button
                    onClick={() => setExpandedMot(expandedMot === mot.year ? null : mot.year)}
                    className="w-full p-3 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span>{mot.year} - {mot.passed ? 'Passed' : 'Failed'}</span>
                    <ChevronRight
                      className={`transition-transform ${expandedMot === mot.year ? 'rotate-90' : ''}`}
                      size={20}
                    />
                  </button>
                  {expandedMot === mot.year && (
                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                      <p className="text-sm text-gray-600 mb-1">Date: {mot.date}</p>
                      <p className="text-sm text-gray-600 mb-1">Mileage: {mot.mileage.toLocaleString()} miles</p>
                      <p className="text-sm text-gray-600">
                        {mot.passed
                          ? 'Passed with no advisories'
                          : 'Failed - Brake disc worn on nearside front. Repaired and retested.'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-xl mb-4">Vehicle Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Brand</p>
                <p>BMW</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Model</p>
                <p>3 Series 320d M Sport</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Year</p>
                <p>2018</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mileage</p>
                <p>45,000 miles</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Previous Owners</p>
                <p>2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
