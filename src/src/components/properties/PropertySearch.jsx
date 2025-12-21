import React, { useState } from 'react';
import { Search, MapPin, ChevronDown, LocateFixed } from 'lucide-react';

const PropertySearch = () => {
    const [propertyType, setPropertyType] = useState('Rent');

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Main Search Input */}
            <div className="flex-grow flex items-center bg-white shadow-sm px-4 py-3 rounded-lg border border-slate-200 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100 transition-all w-full h-14">
                <Search size={20} className="text-slate-400 mr-3" />
                <input
                    type="text"
                    placeholder="Search for Locality, Landmark, Project, or Builder"
                    className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400"
                />
                <button className="ml-2 p-2 hover:bg-slate-100 rounded-full text-violet-600 transition-all hover:scale-110 active:scale-95" title="Detect my location">
                    <LocateFixed size={20} />
                </button>
            </div>

            {/* Property Type Selector */}
            <div className="hidden md:flex items-center gap-3">
                <div className="relative">
                    <div className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-violet-400 transition-colors cursor-pointer">
                        <span className="font-medium min-w-[3rem]">{propertyType}</span>
                        <ChevronDown size={16} className="text-slate-400" />
                        <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        >
                            <option value="Rent">Rent</option>
                            <option value="Buy">Buy</option>
                            <option value="Lease">Lease</option>
                            <option value="PG">PG</option>
                        </select>
                    </div>
                </div>

                <button className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow-lg shadow-violet-200 transition-all transform hover:-translate-y-0.5">
                    Search
                </button>
            </div>
        </div>
    );
};

export default PropertySearch;
