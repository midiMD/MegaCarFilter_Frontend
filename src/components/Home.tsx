import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Tracker {
  id: string;
  title: string;
  active: boolean;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  mileage: number;
  image: string;
}

const mockTrackers: Tracker[] = [
  { id: '1', title: 'BMW 3 Series', active: true },
  { id: '2', title: 'Audi A4', active: true },
  { id: '3', title: 'Mercedes C-Class', active: false },
];

const mockListings: Listing[] = [
  { id: '1', title: '2018 BMW 320d M Sport', price: 18500, location: 'London', mileage: 45000, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400' },
  { id: '2', title: '2019 BMW 330i xDrive', price: 22000, location: 'Manchester', mileage: 32000, image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400' },
  { id: '3', title: '2017 BMW 318i SE', price: 15000, location: 'Birmingham', mileage: 58000, image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400' },
  { id: '4', title: '2020 BMW 320d Sport', price: 24500, location: 'Leeds', mileage: 28000, image: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=400' },
  { id: '5', title: '2016 BMW 320d Luxury', price: 13500, location: 'Bristol', mileage: 72000, image: 'https://images.unsplash.com/photo-1523983302122-73e869e1f850?w=400' },
  { id: '6', title: '2019 BMW 330e M Sport', price: 21000, location: 'Liverpool', mileage: 38000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400' },
];

export function Home() {
  const [trackers, setTrackers] = useState(mockTrackers);
  const [selectedTracker, setSelectedTracker] = useState<string | null>('1');
  const navigate = useNavigate();

  const toggleTracker = (id: string) => {
    setTrackers(trackers.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  const handleListingClick = (listingId: string) => {
    navigate(`/listing/${listingId}`);
  };

  return (
    <div className="flex gap-6 h-screen pt-16 pb-4">
      <div className="w-64 flex-shrink-0">
        <h2 className="text-xl mb-4">Trackers</h2>
        <div className="space-y-2">
          {trackers.map(tracker => (
            <div
              key={tracker.id}
              className={`p-3 border rounded-md cursor-pointer ${
                selectedTracker === tracker.id ? 'bg-gray-100 border-gray-400' : 'border-gray-200'
              }`}
              onClick={() => setSelectedTracker(tracker.id)}
            >
              <div className="flex items-center justify-between">
                <span>{tracker.title}</span>
                <label className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active</span>
                  <input
                    type="checkbox"
                    checked={tracker.active}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleTracker(tracker.id);
                    }}
                    className="w-4 h-4"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {selectedTracker && (
          <>
            <div className="mb-4">
              <span className="text-gray-600">{mockListings.length} results</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {mockListings.map(listing => (
                <div
                  key={listing.id}
                  className="border border-gray-200 rounded-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleListingClick(listing.id)}
                >
                  <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
                  <div className="p-3">
                    <h3 className="mb-2">{listing.title}</h3>
                    <p className="text-gray-600 mb-1">£{listing.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{listing.mileage.toLocaleString()} miles</p>
                    <p className="text-sm text-gray-500">{listing.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
