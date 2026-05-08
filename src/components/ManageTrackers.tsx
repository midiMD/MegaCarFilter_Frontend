import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Tracker {
  id: string;
  title: string;
  service: string;
  url: string;
  frequency: string;
  dateAdded: string;
  location: string;
  radius: number;
  active: boolean;
}

const mockTrackers: Tracker[] = [
  {
    id: '1',
    title: 'BMW 3 Series',
    service: 'Facebook',
    url: 'https://facebook.com/marketplace/london',
    frequency: '1d',
    dateAdded: '2026-04-15',
    location: 'London',
    radius: 25,
    active: true,
  },
  {
    id: '2',
    title: 'Audi A4',
    service: 'eBay',
    url: 'https://ebay.co.uk/motors',
    frequency: '5h',
    dateAdded: '2026-04-20',
    location: 'Manchester',
    radius: 50,
    active: true,
  },
];

export function ManageTrackers() {
  const [trackers, setTrackers] = useState(mockTrackers);
  const [expandedTracker, setExpandedTracker] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTracker, setNewTracker] = useState({
    title: '',
    service: 'Facebook',
    url: '',
    frequency: '1d',
    carTitle: '',
    engineSize: '',
    gearbox: '',
    mileageMax: '',
    yearMin: '',
    yearMax: '',
    priceMin: '',
    priceMax: '',
    includeNeedsWork: false,
    aiFilterMOT: false,
    location: '',
    radius: 25,
  });

  const getServiceIcon = (service: string) => {
    return service.toLowerCase();
  };

  const toggleTracker = (id: string, field: 'active') => {
    setTrackers(trackers.map(t =>
      t.id === id ? { ...t, [field]: !t[field] } : t
    ));
  };

  const updateTrackerFrequency = (id: string, frequency: string) => {
    setTrackers(trackers.map(t =>
      t.id === id ? { ...t, frequency } : t
    ));
  };

  const handleAddTracker = (e: React.FormEvent) => {
    e.preventDefault();
    const tracker: Tracker = {
      id: String(Date.now()),
      title: newTracker.title,
      service: newTracker.service,
      url: newTracker.url,
      frequency: newTracker.frequency,
      dateAdded: new Date().toISOString().split('T')[0],
      location: newTracker.location,
      radius: newTracker.radius,
      active: true,
    };
    setTrackers([...trackers, tracker]);
    setShowAddForm(false);
    setNewTracker({
      title: '',
      service: 'Facebook',
      url: '',
      frequency: '1d',
      carTitle: '',
      engineSize: '',
      gearbox: '',
      mileageMax: '',
      yearMin: '',
      yearMax: '',
      priceMin: '',
      priceMax: '',
      includeNeedsWork: false,
      aiFilterMOT: false,
      location: '',
      radius: 25,
    });
  };

  if (showAddForm) {
    return (
      <div className="max-w-2xl mx-auto pt-16 pb-8">
        <h2 className="text-2xl mb-6">Add New Tracker</h2>
        <form onSubmit={handleAddTracker} className="space-y-4">
          <div>
            <label className="block mb-1">Title *</label>
            <input
              type="text"
              value={newTracker.title}
              onChange={(e) => setNewTracker({ ...newTracker, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., BMW 3 Series"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Service *</label>
            <select
              value={newTracker.service}
              onChange={(e) => setNewTracker({ ...newTracker, service: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Facebook">Facebook</option>
              <option value="eBay">eBay</option>
              <option value="Gumtree">Gumtree</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">URL *</label>
            <input
              type="url"
              value={newTracker.url}
              onChange={(e) => setNewTracker({ ...newTracker, url: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Frequency *</label>
            <select
              value={newTracker.frequency}
              onChange={(e) => setNewTracker({ ...newTracker, frequency: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="5h">5 hours</option>
              <option value="1d">1 day</option>
              <option value="2d">2 days</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Location</label>
            <input
              type="text"
              value={newTracker.location}
              onChange={(e) => setNewTracker({ ...newTracker, location: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., London"
            />
          </div>

          <div>
            <label className="block mb-1">Radius (miles)</label>
            <input
              type="number"
              value={newTracker.radius}
              onChange={(e) => setNewTracker({ ...newTracker, radius: parseInt(e.target.value) || 25 })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <h3 className="text-xl pt-4">Filters</h3>

          <div>
            <label className="block mb-1">Car Title</label>
            <input
              type="text"
              value={newTracker.carTitle}
              onChange={(e) => setNewTracker({ ...newTracker, carTitle: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1">Engine Size</label>
            <input
              type="text"
              value={newTracker.engineSize}
              onChange={(e) => setNewTracker({ ...newTracker, engineSize: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., 2.0L"
            />
          </div>

          <div>
            <label className="block mb-1">Gearbox</label>
            <select
              value={newTracker.gearbox}
              onChange={(e) => setNewTracker({ ...newTracker, gearbox: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Any</option>
              <option value="manual">Manual</option>
              <option value="auto">Automatic</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Maximum Mileage</label>
            <input
              type="number"
              value={newTracker.mileageMax}
              onChange={(e) => setNewTracker({ ...newTracker, mileageMax: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Year (Min)</label>
              <input
                type="number"
                value={newTracker.yearMin}
                onChange={(e) => setNewTracker({ ...newTracker, yearMin: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 2015"
              />
            </div>
            <div>
              <label className="block mb-1">Year (Max)</label>
              <input
                type="number"
                value={newTracker.yearMax}
                onChange={(e) => setNewTracker({ ...newTracker, yearMax: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., 2023"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Price (Min)</label>
              <input
                type="number"
                value={newTracker.priceMin}
                onChange={(e) => setNewTracker({ ...newTracker, priceMin: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="£"
              />
            </div>
            <div>
              <label className="block mb-1">Price (Max)</label>
              <input
                type="number"
                value={newTracker.priceMax}
                onChange={(e) => setNewTracker({ ...newTracker, priceMax: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="£"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeNeedsWork"
              checked={newTracker.includeNeedsWork}
              onChange={(e) => setNewTracker({ ...newTracker, includeNeedsWork: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="includeNeedsWork">Include needs work</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="aiFilterMOT"
              checked={newTracker.aiFilterMOT}
              onChange={(e) => setNewTracker({ ...newTracker, aiFilterMOT: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="aiFilterMOT">AI filter MOT</label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Add Tracker
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-16 pb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">Manage Trackers</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Add New Tracker
        </button>
      </div>

      <div className="space-y-3">
        {trackers.map((tracker) => (
          <div key={tracker.id} className="border border-gray-200 rounded-md overflow-hidden">
            <button
              onClick={() => setExpandedTracker(expandedTracker === tracker.id ? null : tracker.id)}
              className="w-full p-4 flex items-center gap-4 hover:bg-gray-50"
            >
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white flex-shrink-0">
                {tracker.service.charAt(0)}
              </div>
              <div className="flex-1 text-left">
                <p className="mb-2">{tracker.title}</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">URL</p>
                    <p className="truncate">{tracker.url}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check Frequency</p>
                    <p>{tracker.frequency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date Added</p>
                    <p>{tracker.dateAdded}</p>
                  </div>
                </div>
              </div>
              <ChevronRight
                className={`transition-transform flex-shrink-0 ${expandedTracker === tracker.id ? 'rotate-90' : ''}`}
                size={20}
              />
            </button>

            {expandedTracker === tracker.id && (
              <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`active-${tracker.id}`}
                    checked={tracker.active}
                    onChange={() => toggleTracker(tracker.id, 'active')}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`active-${tracker.id}`}>Active</label>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-1">Frequency</label>
                  <select
                    value={tracker.frequency}
                    onChange={(e) => updateTrackerFrequency(tracker.id, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="5h">5 hours</option>
                    <option value="1d">1 day</option>
                    <option value="2d">2 days</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p>{tracker.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Radius</p>
                    <p>{tracker.radius} miles</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
