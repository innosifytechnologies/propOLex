import React, { useState } from 'react';
import { Filter, ChevronDown, Check, Search } from 'lucide-react';

const FilterSection = ({ title, children, isOpen = true }) => {
    const [open, setOpen] = useState(isOpen);
    return (
        <div className="border-b border-slate-100 py-5 last:border-0">
            <div
                className="flex justify-between items-center cursor-pointer mb-3 select-none"
                onClick={() => setOpen(!open)}
            >
                <h4 className="font-semibold text-slate-800 text-sm uppercase tracking-wider">{title}</h4>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </div>
            {open && <div className="space-y-2.5 animate-in slide-in-from-top-1 duration-200">{children}</div>}
        </div>
    );
};

const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group select-none relative">
        <input
            type="checkbox"
            className="peer sr-only"
            checked={checked}
            onChange={onChange}
        />
        <div className="w-5 h-5 border-2 border-slate-300 rounded flex items-center justify-center text-white bg-white peer-checked:bg-violet-600 peer-checked:border-violet-600 transition-all duration-200 group-hover:border-violet-400">
            <Check size={14} strokeWidth={3} className="opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
        </div>
        <span className="text-slate-600 text-sm font-medium group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
);

const Radio = ({ label, name, defaultChecked, checked, onChange }) => (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
        <input
            type="radio"
            name={name}
            defaultChecked={defaultChecked}
            checked={checked}
            onChange={onChange}
            className="peer sr-only"
        />
        <div className="w-5 h-5 border-2 border-slate-300 rounded-full flex items-center justify-center bg-white peer-checked:border-violet-600 group-hover:border-violet-400 transition-all duration-200 peer-checked:[&>div]:opacity-100">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-600 opacity-0 transition-opacity duration-200" />
        </div>
        <span className="text-slate-600 text-sm font-medium group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
);


const SidebarFilter = ({ isMobile = false, filters = {}, setFilters = () => { }, onApply, onClear }) => {

    // Handlers
    const handleRadioChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (category, value) => {
        setFilters(prev => {
            const current = prev[category] || [];
            if (current.includes(value)) {
                return { ...prev, [category]: current.filter(item => item !== value) };
            } else {
                return { ...prev, [category]: [...current, value] };
            }
        });
    };

    return (
        <div className={isMobile
            ? "h-full flex flex-col"
            : "bg-white rounded-xl border border-slate-200 shadow-sm sticky top-24 flex flex-col max-h-[calc(100vh-120px)]"
        }>
            {/* Header - Fixed */}
            {!isMobile && (
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-xl z-10">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Filter size={20} className="text-violet-600" />
                        Filters
                    </h3>
                    <button
                        onClick={() => setFilters({
                            location: '', status: 'All Properties', propertyType: [], budgetMin: '', budgetMax: '',
                            bhk: [], saleStatus: [], furnishing: [], possessionStatus: [], amenities: [],
                            facing: [], flooring: [], postedBy: []
                        })}
                        className="text-xs text-violet-600 font-bold hover:text-violet-700 hover:underline uppercase tracking-wide"
                    >
                        Clear All
                    </button>
                </div>
            )}

            {/* Scrollable Content */}
            <div className={`flex-grow overflow-y-auto p-5 custom-scrollbar ${isMobile ? 'pb-20' : ''}`}>

                {/* Location Search */}
                <div className="mb-6">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Location</label>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search locality..."
                            value={filters?.location || ''}
                            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-200 transition-all"
                        />
                    </div>
                </div>

                <FilterSection title="Review Status">
                    <Radio
                        name="status"
                        label="All Properties"
                        checked={filters?.status === 'All Properties'}
                        onChange={() => handleRadioChange('status', 'All Properties')}
                    />
                    <Radio
                        name="status"
                        label="Verified Only"
                        checked={filters?.status === 'Verified Only'}
                        onChange={() => handleRadioChange('status', 'Verified Only')}
                    />
                </FilterSection>

                <FilterSection title="Property Type">
                    {['Apartment', 'Independent House / Villa', 'Residential Plot', 'Farm House', 'Studio Apartment', 'Service Apartment'].map(type => (
                        <Checkbox
                            key={type}
                            label={type}
                            checked={filters?.propertyType?.includes(type)}
                            onChange={() => handleCheckboxChange('propertyType', type)}
                        />
                    ))}
                </FilterSection>

                <FilterSection title="Budget">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">MIN</span>
                            <input
                                type="number"
                                className="w-full pl-10 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-violet-500 outline-none"
                                placeholder="₹"
                                value={filters?.budgetMin || ''}
                                onChange={(e) => setFilters(prev => ({ ...prev, budgetMin: e.target.value }))}
                            />
                        </div>
                        <span className="text-slate-400 font-medium">-</span>
                        <div className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">MAX</span>
                            <input
                                type="number"
                                className="w-full pl-10 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-violet-500 outline-none"
                                placeholder="₹"
                                value={filters?.budgetMax || ''}
                                onChange={(e) => setFilters(prev => ({ ...prev, budgetMax: e.target.value }))}
                            />
                        </div>
                    </div>
                    {/* Pills can update min/max logic theoretically, but for now leave static or make them work? User didn't prioritize pills. */}
                </FilterSection>

                <FilterSection title="BHK">
                    <div className="flex gap-2 flex-wrap">
                        {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'].map(num => (
                            <label key={num} className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={filters?.bhk?.includes(num)}
                                    onChange={() => handleCheckboxChange('bhk', num)}
                                />
                                <span className="block px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 peer-checked:bg-violet-600 peer-checked:text-white peer-checked:border-violet-600 hover:border-violet-400 transition-all">
                                    {num}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Other sections similarly updated */}
                <FilterSection title="Sale Status">
                    {['New Launch', 'Ready to Move', 'Under Construction', 'Resale'].map(item => (
                        <Checkbox key={item} label={item} checked={filters?.saleStatus?.includes(item)} onChange={() => handleCheckboxChange('saleStatus', item)} />
                    ))}
                </FilterSection>

                <FilterSection title="Furnishing">
                    {['Fully Furnished', 'Semi Furnished', 'Unfurnished'].map(item => (
                        <Checkbox key={item} label={item} checked={filters?.furnishing?.includes(item)} onChange={() => handleCheckboxChange('furnishing', item)} />
                    ))}
                </FilterSection>

                <FilterSection title="Possession Status">
                    {['Ready to Move', 'In 1 Year', 'In 3 Years', 'Beyond 3 Years'].map(item => (
                        <Checkbox key={item} label={item} checked={filters?.possessionStatus?.includes(item)} onChange={() => handleCheckboxChange('possessionStatus', item)} />
                    ))}
                </FilterSection>

                <FilterSection title="Amenities">
                    {['Parking', 'Lift', 'Power Backup', 'Gated Security', 'Gym', 'Swimming Pool', 'Club House', 'Park / Garden', 'Gas Pipeline'].map(item => (
                        <Checkbox key={item} label={item} checked={filters?.amenities?.includes(item)} onChange={() => handleCheckboxChange('amenities', item)} />
                    ))}
                </FilterSection>

                <FilterSection title="Facing">
                    {['North', 'East', 'West', 'South', 'North-East'].map(item => (
                        <Checkbox key={item} label={item} checked={filters?.facing?.includes(item)} onChange={() => handleCheckboxChange('facing', item)} />
                    ))}
                </FilterSection>

                <FilterSection title="Flooring">
                    {['Vitrified', 'Marble', 'Wooden', 'Granite'].map(item => (
                        <Checkbox key={item} label={item} checked={filters?.flooring?.includes(item)} onChange={() => handleCheckboxChange('flooring', item)} />
                    ))}
                </FilterSection>

                <FilterSection title="Posted By">
                    {['Owner', 'Broker / Agent', 'Builder'].map(item => (
                        <Checkbox key={item} label={item} checked={filters?.postedBy?.includes(item)} onChange={() => handleCheckboxChange('postedBy', item)} />
                    ))}
                </FilterSection>

            </div>

            {/* Footer gradient fade for indication if needed, or simple padding */}
            {!isMobile && <div className="h-4 bg-gradient-to-t from-white to-transparent pointer-events-none absolute bottom-0 w-full rounded-b-xl" />}

            {/* Mobile Apply Button */}
            {isMobile && (
                <div className="p-4 border-t border-slate-100 bg-white mt-auto flex gap-3">
                    <button
                        onClick={onClear}
                        className="flex-1 py-3 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-all"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onApply}
                        className="flex-[2] py-3 bg-violet-600 text-white font-bold rounded-lg shadow-lg shadow-violet-200 active:scale-[0.98] transition-all"
                    >
                        Apply Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default SidebarFilter;
