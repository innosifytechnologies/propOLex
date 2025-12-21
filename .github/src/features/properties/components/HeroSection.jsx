import React, { useState, useEffect } from 'react';
import { Search, MapPin, Home, DollarSign, BedDouble, ArrowRight, Tag, Sofa, ChevronDown, History } from 'lucide-react';
import Button from '@/components/ui/Button';
import heroBg from '@/assets/hero-bg.png';
import { Building2 as Building2Icon } from 'lucide-react';

const HeroSection = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(250);
    const [mobileType, setMobileType] = useState('Rent');
    const [isTypeOpen, setIsTypeOpen] = useState(false);

    const words = ["Home", "Apartment", "Villa", "Estate", "Sanctuary"];

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 100 : 250);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1500); // Pause before deleting
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return (
        <div className="relative h-[400px] mb-28 w-full font-sans flex flex-col items-center justify-center">
            {/* Hero Content Wrapper (Clipped) */}
            <div className="absolute inset-0 rounded-b-[30px] overflow-hidden">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={heroBg}
                        alt="Modern Luxury Villa"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                </div>

                {/* Centered Title */}
                <div className="absolute inset-0 z-10 flex flex-col  justify-center pb-32 px-6 text-center pointer-events-none">
                    <div className=" animate-fade-in-up mt-24">
                        <h1 className="text-[30px] md:text-4xl font-bold text-white tracking-tight drop-shadow-lg grid grid-rows-2 md:grid-cols-2 gap-x-2 w-full max-w-4xl mx-auto">
                           
                            <div className=" text-left md:text-right">Discover Your New</div>
                            <div className="text-left text-primary-400">
                                {text}<span className="animate-pulse text-white">|</span>
                            </div>
                        </h1>
                        <p className="text-lg md:text-md text-white/90 font-[600] max-w-2xl mx-auto drop-shadow-md text-left md:text-center md:mt-[-10px] mt-[10px]">
                            We have the most listings and constant updates. So you never miss out.
                        </p>
                    </div>
                </div>
            </div>

            {/* Search Section - Bottom Aligned */}
            <div className="absolute bottom-0 z-20 w-full px-4 translate-y-1/2">
                <div className="max-w-5xl mx-auto">
                    {/* Search Box & Filters Container */}
                    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-[30px] shadow-2xl space-y-4 text-left border border-white/20">

                        {/* Top Row: Search Input */}
                        <div className="relative flex items-center">
                            <MapPin className="absolute left-4 text-slate-400 h-6 w-6" />
                            <input
                                type="text"
                                placeholder="Search by City, Neighborhood, or Address..."
                                className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg placeholder:text-slate-400"
                            />
                            <Button size="lg" className="absolute right-2 hidden sm:flex rounded-full">
                                Search
                            </Button>
                        </div>

                        {/* Bottom Row: Filters - 6 Columns Grid */}
                        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-4">

                            {/* Type Filter */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Home className="h-4 w-4 text-slate-400" />
                                </div>
                                <select className="w-full pl-9 pr-8 py-3 rounded-2xl bg-white border-r-[8px] border-r-transparent border-slate-200 text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none cursor-pointer">
                                    <option>Buy</option>
                                    <option>Rent</option>
                                    <option>Sold</option>
                                </select>
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Building2Icon className="h-4 w-4 text-slate-400" />
                                </div>
                                <select className="w-full pl-9 pr-8 py-3 rounded-2xl bg-white border-r-[8px] border-r-transparent border-slate-200 text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none cursor-pointer">
                                    <option>Any Type</option>
                                    <option>Apartment</option>
                                    <option>Villa</option>
                                    <option>Plot</option>
                                </select>
                            </div>

                            {/* BHK Filter */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <BedDouble className="h-4 w-4 text-slate-400" />
                                </div>
                                <select className="w-full pl-9 pr-8 py-3 rounded-2xl bg-white border-r-[8px] border-r-transparent border-slate-200 text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none cursor-pointer">
                                    <option>BHK</option>
                                    <option>1 BHK</option>
                                    <option>2 BHK</option>
                                    <option>3 BHK</option>
                                    <option>4+ BHK</option>
                                </select>
                            </div>

                            {/* Price Filter */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-4 w-4 text-slate-400" />
                                </div>
                                <select className="w-full pl-9 pr-8 py-3 rounded-2xl bg-white border-r-[8px] border-r-transparent border-slate-200 text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none cursor-pointer">
                                    <option>Budget</option>
                                    <option>&lt; 50L</option>
                                    <option>50L - 1Cr</option>
                                    <option>1Cr - 3Cr</option>
                                    <option>3Cr +</option>
                                </select>
                            </div>

                            {/* Sale Status Filter */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Tag className="h-4 w-4 text-slate-400" />
                                </div>
                                <select className="w-full pl-9 pr-8 py-3 rounded-2xl bg-white border-r-[8px] border-r-transparent border-slate-200 text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none cursor-pointer">
                                    <option>Status</option>
                                    <option>Ready</option>
                                    <option>New Launch</option>
                                    <option>Resale</option>
                                </select>
                            </div>

                            {/* Furnishing Filter */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Sofa className="h-4 w-4 text-slate-400" />
                                </div>
                                <select className="w-full pl-9 pr-8 py-3 rounded-2xl bg-white border-r-[8px] border-r-transparent border-slate-200 text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 appearance-none cursor-pointer">
                                    <option>Furnishing</option>
                                    <option>Full</option>
                                    <option>Semi</option>
                                    <option>None</option>
                                </select>
                            </div>

                        </div>

                        {/* Mobile Actions: Selector + Search Button */}
                        <div className="flex gap-2 mt-4 sm:hidden h-12 relative z-50">
                            {/* Custom Mobile Type Selector */}
                            <div className="relative flex-1 h-full">
                                <button
                                    onClick={() => setIsTypeOpen(!isTypeOpen)}
                                    className="w-full h-full flex items-center justify-center gap-2 px-4 bg-white border border-slate-200 rounded-full text-slate-700 font-medium active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary-100"
                                >
                                    <Home size={18} className="text-violet-600" />
                                    <span>{mobileType}</span>
                                    <ChevronDown size={16} className={`transition-transform duration-300 ${isTypeOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isTypeOpen && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200 z-50">
                                        {['Rent', 'Buy', 'PG', 'Plot'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => {
                                                    setMobileType(type);
                                                    setIsTypeOpen(false);
                                                }}
                                                className={`w-full py-3 px-4 text-center text-sm font-medium transition-colors border-b border-slate-50 last:border-0 ${mobileType === type
                                                    ? 'bg-violet-50 text-violet-600'
                                                    : 'text-slate-600 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Search Button */}
                            <div className="flex-1 h-full">
                                <Button size="lg" className="w-full h-full flex items-center justify-center gap-2 rounded-full p-0">
                                    <Search size={20} />
                                    Search
                                </Button>
                            </div>
                        </div>

                        {/* Recent Searches Pills */}
                        <div className="hidden sm:flex justify-center flex-wrap gap-3 pt-2 border-t border-white/20">
                            {["Whitefield, Bangalore", "3 BHK Villa", "Rental near Tech Park", "All Searches"].map((item, idx) => (
                                <button
                                    key={idx}
                                    className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 hover:border-slate-400 bg-white/50 hover:bg-white hover:shadow-sm transition-all text-sm text-slate-700 font-medium"
                                >
                                    <History size={14} className="text-slate-500" />
                                    {item}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
