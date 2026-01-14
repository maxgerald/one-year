import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Home, Bread, Car, GraduationCap, TrendingUp } from 'lucide-react';

const WealthTimeline = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [comparisonType, setComparisonType] = useState('wealth-gap');
  const [selectedItem, setSelectedItem] = useState('bread');

  // Historical data (estimates based on research)
  const historicalData = [
    {
      year: 1890,
      medianIncome: 380,
      lowIncome: 200,
      richestPerson: 'John D. Rockefeller',
      richestWealth: 1400000000, // $1.4B (~$400B in 2024 dollars)
      breadPrice: 0.05,
      milkPrice: 0.07,
      homePrice: 2500,
      carPrice: null,
      collegeYear: 150
    },
    {
      year: 1900,
      medianIncome: 438,
      lowIncome: 230,
      richestPerson: 'John D. Rockefeller',
      richestWealth: 1600000000,
      breadPrice: 0.05,
      milkPrice: 0.07,
      homePrice: 3000,
      carPrice: null,
      collegeYear: 200
    },
    {
      year: 1913,
      medianIncome: 627,
      lowIncome: 325,
      richestPerson: 'John D. Rockefeller',
      richestWealth: 900000000,
      breadPrice: 0.056,
      milkPrice: 0.09,
      homePrice: 3500,
      carPrice: 850,
      collegeYear: 250
    },
    {
      year: 1920,
      medianIncome: 1236,
      lowIncome: 650,
      richestPerson: 'Henry Ford',
      richestWealth: 200000000,
      breadPrice: 0.12,
      milkPrice: 0.17,
      homePrice: 4500,
      carPrice: 525,
      collegeYear: 350
    },
    {
      year: 1930,
      medianIncome: 1368,
      lowIncome: 700,
      richestPerson: 'Andrew Mellon',
      richestWealth: 600000000,
      breadPrice: 0.09,
      milkPrice: 0.14,
      homePrice: 3900,
      carPrice: 610,
      collegeYear: 400
    },
    {
      year: 1940,
      medianIncome: 1299,
      lowIncome: 750,
      richestPerson: 'Henry Ford',
      richestWealth: 200000000,
      breadPrice: 0.08,
      milkPrice: 0.13,
      homePrice: 3920,
      carPrice: 800,
      collegeYear: 420
    },
    {
      year: 1950,
      medianIncome: 3300,
      lowIncome: 1800,
      richestPerson: 'H.L. Hunt',
      richestWealth: 600000000,
      breadPrice: 0.14,
      milkPrice: 0.21,
      homePrice: 7400,
      carPrice: 1510,
      collegeYear: 600
    },
    {
      year: 1960,
      medianIncome: 5600,
      lowIncome: 3000,
      richestPerson: 'J. Paul Getty',
      richestWealth: 1200000000,
      breadPrice: 0.20,
      milkPrice: 0.31,
      homePrice: 11900,
      carPrice: 2600,
      collegeYear: 1000
    },
    {
      year: 1970,
      medianIncome: 9870,
      lowIncome: 5200,
      richestPerson: 'J. Paul Getty',
      richestWealth: 2000000000,
      breadPrice: 0.25,
      milkPrice: 0.33,
      homePrice: 23400,
      carPrice: 3540,
      collegeYear: 1700
    },
    {
      year: 1980,
      medianIncome: 21020,
      lowIncome: 11000,
      richestPerson: 'Daniel Ludwig',
      richestWealth: 3000000000,
      breadPrice: 0.50,
      milkPrice: 0.82,
      homePrice: 76400,
      carPrice: 7200,
      collegeYear: 3800
    },
    {
      year: 1990,
      medianIncome: 29943,
      lowIncome: 15500,
      richestPerson: 'Sam Walton',
      richestWealth: 28000000000,
      breadPrice: 0.70,
      milkPrice: 1.39,
      homePrice: 122900,
      carPrice: 16000,
      collegeYear: 8300
    },
    {
      year: 2000,
      medianIncome: 42148,
      lowIncome: 22000,
      richestPerson: 'Bill Gates',
      richestWealth: 60000000000,
      breadPrice: 0.91,
      milkPrice: 2.79,
      homePrice: 169000,
      carPrice: 22000,
      collegeYear: 16200
    },
    {
      year: 2010,
      medianIncome: 49445,
      lowIncome: 26000,
      richestPerson: 'Carlos Slim',
      richestWealth: 53500000000,
      breadPrice: 1.35,
      milkPrice: 3.32,
      homePrice: 221800,
      carPrice: 29200,
      collegeYear: 28500
    },
    {
      year: 2020,
      medianIncome: 67521,
      lowIncome: 35000,
      richestPerson: 'Jeff Bezos',
      richestWealth: 177000000000,
      breadPrice: 1.50,
      milkPrice: 3.50,
      homePrice: 329000,
      carPrice: 40000,
      collegeYear: 35800
    },
    {
      year: 2024,
      medianIncome: 75000,
      lowIncome: 38000,
      richestPerson: 'Elon Musk',
      richestWealth: 250000000000,
      breadPrice: 1.65,
      milkPrice: 3.85,
      homePrice: 420000,
      carPrice: 48000,
      collegeYear: 42000
    }
  ];

  const currentData = historicalData.find(d => d.year === selectedYear);

  const itemData = {
    bread: { name: 'Loaf of Bread', icon: Bread, price: currentData?.breadPrice },
    milk: { name: 'Gallon of Milk', icon: Bread, price: currentData?.milkPrice },
    home: { name: 'Median Home', icon: Home, price: currentData?.homePrice },
    car: { name: 'New Car', icon: Car, price: currentData?.carPrice },
    college: { name: 'Year of College', icon: GraduationCap, price: currentData?.collegeYear }
  };

  // Calculate comparisons
  const weeklyMedianWage = currentData?.medianIncome / 52;
  const weeklyLowWage = currentData?.lowIncome / 52;
  const itemsPerWeekMedian = itemData[selectedItem].price ? weeklyMedianWage / itemData[selectedItem].price : null;
  const itemsPerWeekLow = itemData[selectedItem].price ? weeklyLowWage / itemData[selectedItem].price : null;
  
  const lifetimeEarnings = currentData?.medianIncome * 40; // 40 year career
  const wealthMultiple = currentData?.richestWealth / lifetimeEarnings;

  const yearsForHome = currentData?.homePrice / currentData?.medianIncome;
  const yearsForCar = currentData?.carPrice ? currentData?.carPrice / currentData?.medianIncome : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Wealth Through Time
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From Rockefeller to Musk: How extreme wealth and worker purchasing power have changed across 130+ years
          </p>
        </div>

        {/* Year Selector */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 mb-8 border border-slate-700">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold text-amber-400">{selectedYear}</span>
              <span className="text-slate-400 text-sm">Slide to explore history</span>
            </div>
            <input
              type="range"
              min={1890}
              max={2024}
              step={10}
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>1890 - Gilded Age</span>
              <span>1950s - Post-War</span>
              <span>2024 - Today</span>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setComparisonType('wealth-gap')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              comparisonType === 'wealth-gap'
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <TrendingUp className="inline mr-2" size={20} />
            Wealth Gap
          </button>
          <button
            onClick={() => setComparisonType('purchasing-power')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              comparisonType === 'purchasing-power'
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <DollarSign className="inline mr-2" size={20} />
            Purchasing Power
          </button>
        </div>

        {/* Wealth Gap View */}
        {comparisonType === 'wealth-gap' && (
          <div className="space-y-8">
            {/* Main Stat */}
            <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 rounded-2xl p-8 border border-red-700/50">
              <h2 className="text-3xl font-bold mb-6 text-center">
                {currentData?.richestPerson}'s Wealth vs. Median Worker
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">
                    ${(currentData?.richestWealth / 1000000000).toFixed(1)}B
                  </div>
                  <div className="text-slate-300">Richest Person's Wealth</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    ${currentData?.medianIncome.toLocaleString()}
                  </div>
                  <div className="text-slate-300">Median Annual Income</div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold text-red-400 mb-2">
                    {wealthMultiple.toLocaleString(undefined, {maximumFractionDigits: 0})}x
                  </div>
                  <div className="text-slate-300">Lifetime Earnings (40 years)</div>
                </div>
              </div>
              <div className="mt-6 p-6 bg-slate-900/50 rounded-xl">
                <p className="text-lg text-center">
                  In {selectedYear}, <span className="font-bold text-amber-400">{currentData?.richestPerson}</span> had wealth equal to{' '}
                  <span className="font-bold text-red-400">{wealthMultiple.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>{' '}
                  median workers' <span className="italic">entire lifetime earnings</span>.
                </p>
              </div>
            </div>

            {/* Historical Chart */}
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Wealth Gap Over Time</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    labelStyle={{ color: '#f59e0b' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={(d) => d.richestWealth / (d.medianIncome * 40)} 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    name="Wealth Multiple (vs. lifetime earnings)"
                    dot={{ fill: '#ef4444', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Purchasing Power View */}
        {comparisonType === 'purchasing-power' && (
          <div className="space-y-8">
            {/* Item Selector */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(itemData).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => setSelectedItem(key)}
                  disabled={!item.price}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    selectedItem === key
                      ? 'bg-blue-500 text-white'
                      : item.price
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <item.icon className="mx-auto mb-2" size={24} />
                  <div className="text-sm">{item.name}</div>
                </button>
              ))}
            </div>

            {/* Main Comparison */}
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-2xl p-8 border border-blue-700/50">
              <h2 className="text-3xl font-bold mb-6 text-center">
                What Could a Week's Wages Buy in {selectedYear}?
              </h2>
              
              {itemsPerWeekMedian && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 rounded-xl p-6">
                    <div className="text-center mb-4">
                      <div className="text-sm text-slate-400 mb-2">Median Worker</div>
                      <div className="text-5xl font-bold text-blue-400 mb-2">
                        {itemsPerWeekMedian.toFixed(1)}
                      </div>
                      <div className="text-slate-300">{itemData[selectedItem].name}s per week</div>
                    </div>
                    <div className="text-sm text-slate-400 space-y-1">
                      <div>Weekly wage: ${weeklyMedianWage.toFixed(2)}</div>
                      <div>Item price: ${itemData[selectedItem].price.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  {itemsPerWeekLow && (
                    <div className="bg-slate-800/50 rounded-xl p-6">
                      <div className="text-center mb-4">
                        <div className="text-sm text-slate-400 mb-2">Low-Income Worker</div>
                        <div className="text-5xl font-bold text-cyan-400 mb-2">
                          {itemsPerWeekLow.toFixed(1)}
                        </div>
                        <div className="text-slate-300">{itemData[selectedItem].name}s per week</div>
                      </div>
                      <div className="text-sm text-slate-400 space-y-1">
                        <div>Weekly wage: ${weeklyLowWage.toFixed(2)}</div>
                        <div>Item price: ${itemData[selectedItem].price.toFixed(2)}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedItem === 'home' && yearsForHome && (
                <div className="mt-6 p-6 bg-slate-900/50 rounded-xl">
                  <p className="text-lg text-center">
                    A median home cost <span className="font-bold text-blue-400">{yearsForHome.toFixed(1)} years</span> of median income in {selectedYear}.
                  </p>
                </div>
              )}

              {selectedItem === 'car' && yearsForCar && (
                <div className="mt-6 p-6 bg-slate-900/50 rounded-xl">
                  <p className="text-lg text-center">
                    A new car cost <span className="font-bold text-blue-400">{yearsForCar.toFixed(2)} years</span> of median income in {selectedYear}.
                  </p>
                </div>
              )}
            </div>

            {/* Purchasing Power Chart */}
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Purchasing Power Over Time</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                    labelStyle={{ color: '#f59e0b' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey={(d) => itemData[selectedItem].price ? (d.medianIncome / 52) / d[selectedItem + 'Price'] : null}
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    name={`${itemData[selectedItem].name}s per week (median wage)`}
                    dot={{ fill: '#3b82f6', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p className="mb-2">Data sources: Historical wage and price data from various economic research sources.</p>
          <p>Wealth figures adjusted for historical context. Some values are estimates.</p>
        </div>
      </div>
    </div>
  );
};

export default WealthTimeline;
