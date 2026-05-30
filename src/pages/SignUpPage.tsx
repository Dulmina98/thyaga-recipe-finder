import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { EnvelopeSimple, LockKey, User } from '@phosphor-icons/react';

export const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Sign up successful! (Mock)');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] font-sans flex pt-16">
      
      {/* Left side: Image/Graphic */}
      <div className="hidden lg:flex w-1/2 bg-[#1a1a1a] relative border-r-2 border-[#1a1a1a] items-center justify-center overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=1200" 
           alt="Cooking setup"
           className="absolute inset-0 w-full h-full object-cover opacity-60"
         />
         <div className="absolute inset-0 bg-[#E8500B]/10 mix-blend-multiply" />
         
         <div className="relative z-10 p-12 text-center max-w-lg">
           <h2 className="text-4xl font-bold text-white leading-tight mb-4 tracking-tight">Join the Culinary Club.</h2>
           <p className="text-[#FAF6EF] text-lg font-medium opacity-90">Discover, save, and master thousands of recipes from around the globe.</p>
         </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <div className="text-center lg:text-left mb-10">
          <Link to="/" className="inline-block lg:hidden text-4xl font-bold tracking-tight mb-8">
            <span className="text-[#1a1a1a]">Recipe</span><span className="text-[#E8500B]">Finder</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Join the Community</h1>
          <p className="text-[#1a1a1a] opacity-70 mt-2">
            Save your favourite recipes and discover new ones tailored just for you.
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="bg-white border-2 border-[#1a1a1a] p-8"
          style={{ boxShadow: '8px 8px 0px #1a1a1a' }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1a1a1a]">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a1a1a] opacity-50">
                  <User size={20} weight="bold" />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Gordon Ramsay"
                  className="w-full border-2 border-[#1a1a1a] bg-[#FAF6EF] py-3 pl-12 pr-4 text-[#1a1a1a] font-medium placeholder:text-[#1a1a1a] placeholder:opacity-40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E8500B] transition-colors"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1a1a1a]">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a1a1a] opacity-50">
                  <EnvelopeSimple size={20} weight="bold" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chef@kitchen.com"
                  className="w-full border-2 border-[#1a1a1a] bg-[#FAF6EF] py-3 pl-12 pr-4 text-[#1a1a1a] font-medium placeholder:text-[#1a1a1a] placeholder:opacity-40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E8500B] transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1a1a1a]">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a1a1a] opacity-50">
                  <LockKey size={20} weight="bold" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-2 border-[#1a1a1a] bg-[#FAF6EF] py-3 pl-12 pr-4 text-[#1a1a1a] font-medium placeholder:text-[#1a1a1a] placeholder:opacity-40 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E8500B] transition-colors"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full justify-center py-4 text-base mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

          </form>

          <div className="mt-8 text-center text-sm font-medium text-[#1a1a1a]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#E8500B] hover:underline underline-offset-4 font-bold">
              Log in
            </Link>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

export default SignUpPage;
