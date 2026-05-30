import React, { useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { TEAM, VALUES, MILESTONES, STATS, PRESS } from '../data/aboutMockData';

const TeamCard: React.FC<{ member: typeof TEAM[0] }> = ({ member }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="border-2 border-[#1a1a1a] bg-white overflow-hidden transition-all duration-200 cursor-pointer"
      style={{
        boxShadow: hovered ? '6px 6px 0px #1a1a1a' : 'none',
        transform: hovered ? 'translate(-2px, -2px)' : 'translate(0,0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: member.accent }}
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: member.accent }}>
          {member.role}
        </p>
        <h3 className="mt-1 text-lg font-bold text-[#000]">{member.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#1a1a1a] opacity-65">{member.bio}</p>
      </div>
    </div>
  );
};

export const AboutPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-[#FAF6EF]">

      <section className="pt-16 bg-[#FAF6EF]">
        <div className="layout-container">
          <div className="flex flex-col lg:flex-row items-stretch min-h-[520px]">

            <div className="w-full lg:w-1/2 py-20 lg:py-28 flex flex-col justify-center lg:pr-16">
              <p className="inline-block border border-[#E8500B] px-3 rounded-full mb-4 text-sm font-semibold tracking-wider uppercase text-[#E8500B] w-fit">
                ● Our Story
              </p>
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-[#1a1a1a]">
                Built by <br />
                <span className="text-[#E8500B]">Cooks.</span><br />
                For Cooks.
              </h1>
              <p className="mt-6 text-lg leading-8 text-[#1a1a1a] opacity-70 max-w-lg">
                RecipeFinder started in 2022 as a simple question: why is it still so hard to find the right recipe for tonight? Two years and 50,000 home cooks later, we're still asking the same question — and building the answer.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#team" className="inline-flex items-center gap-2 rounded-full border-2 border-[#E8500B] bg-[#E8500B] px-6 py-3 text-sm font-bold text-white hover:bg-[#c94008] transition-colors">
                  Meet the Team <ArrowRight weight="bold" />
                </a>
                <a href="#values" className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a1a] px-6 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors">
                  Our Values
                </a>
              </div>
            </div>

            <div className="hidden lg:flex w-full lg:w-1/2 flex-col border-l-2 border-[#1a1a1a]">
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex-1 flex flex-col justify-center px-12 border-b-2 border-[#1a1a1a] last:border-b-0 transition-colors duration-200 group cursor-default ${
                    i % 2 === 0 ? 'bg-[#FAF6EF] hover:bg-[#E8500B]' : 'bg-[#1a1a1a] hover:bg-[#E8500B]'
                  }`}
                >
                  <p className={`text-5xl font-bold transition-colors ${i % 2 === 0 ? 'text-[#E8500B] group-hover:text-white' : 'text-white group-hover:text-white'}`}>
                    {stat.value}
                  </p>
                  <p className={`mt-1 text-sm font-medium transition-colors ${i % 2 === 0 ? 'text-[#1a1a1a] group-hover:text-white/80' : 'text-[#CDCBC0] group-hover:text-white/80'}`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <div className="overflow-hidden py-5 bg-[#F0EAE0] border-t-2 border-b-2 border-[#1a1a1a]">
        <div className="flex w-max whitespace-nowrap" style={{ animation: 'marquee 40s linear infinite' }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {['Our Mission', 'Great Food for Everyone', 'Built with Love', 'Cook Bold'].map(t => (
                <span key={t} className="mx-8 text-[15px] uppercase tracking-widest text-[#1a1a1a]/40">
                  {t} •
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
      </div>

      <section className="py-20 lg:py-28 bg-[#1a1a1a]">
        <div className="layout-container">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-[#E8500B] mb-4">Our Mission</p>
            <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              "Make every home cook feel like they have a{' '}
              <span className="text-[#E8500B]">Michelin-starred chef</span>{' '}
              in their pocket."
            </blockquote>
            <p className="mt-8 text-lg text-[#CDCBC0] leading-8 max-w-2xl">
              We're not trying to replace cooking — we're trying to make it more joyful, more confident, and more personal. Whether you have five ingredients and twenty minutes, or a free Sunday and a farmers' market haul, RecipeFinder meets you where you are.
            </p>
          </div>
        </div>
      </section>

      <section id="values" className="py-20 lg:py-28 bg-[#FAF6EF]">
        <div className="layout-container">
          <p className="text-sm font-bold uppercase tracking-wider text-[#E8500B] mb-2">What We Stand For</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#1a1a1a] mb-12">Our Values</h2>
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 border-2 border-[#1a1a1a]">
            {VALUES.map((v, i) => (
              <div
                key={v.number}
                className={`relative p-8 ${v.bg} ${i > 0 ? 'lg:border-l-2 border-[#1a1a1a]' : ''} group transition-all duration-200`}
              >
                <p className={`text-[64px] font-bold leading-none absolute top-4 right-6 ${v.numColor}`}>{v.number}</p>
                <h3 className={`text-lg font-bold mt-2 ${v.textColor}`}>{v.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${v.subColor}`}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ backgroundColor: '#F0EAE0' }}>
        <div className="layout-container">
          <p className="text-sm font-bold uppercase tracking-wider text-[#E8500B] mb-2">Since Day One</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#1a1a1a] mb-12">Our Journey</h2>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            <div className="flex-1 relative">
              <div className="hidden md:block absolute w-px bg-[#1a1a1a]" style={{ left: 160, top: 0, bottom: 0 }} />

              <div className="flex flex-col">
                {MILESTONES.map((m, i) => (
                  <div key={i} className="flex items-center group">
                    <div className="hidden md:block w-36 flex-shrink-0 text-right pr-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E8500B]">{m.year}</span>
                    </div>
                    <div className="hidden md:flex w-8 flex-shrink-0 items-center justify-center z-10">
                      <div className="w-4 h-4 rounded-full border-2 border-[#E8500B] bg-[#F0EAE0] group-hover:bg-[#E8500B] transition-colors" />
                    </div>
                    <div className="flex-1 py-7 pl-8 border-b border-[#1a1a1a]/10 last:border-b-0">
                      <p className="md:hidden text-xs font-bold uppercase tracking-wider text-[#E8500B] mb-1">{m.year}</p>
                      <p className="text-[15px] text-[#1a1a1a] leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block w-80 xl:w-96 flex-shrink-0 sticky top-28">
              <div
                className="border-2 border-[#1a1a1a] overflow-hidden"
                style={{ boxShadow: '6px 6px 0px #1a1a1a' }}
              >
                <div className="relative h-[480px]">
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80"
                    alt="Delicious food"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a]/80 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#E8500B] mb-0.5">Since 2022</p>
                    <p className="text-sm font-semibold text-white leading-snug">
                      Building the kitchen of the future, one recipe at a time.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 border-2 border-[#1a1a1a] bg-[#E8500B] px-5 py-3">
                <p className="text-xs font-bold uppercase tracking-widest text-white/70">Featured Stat</p>
                <p className="text-2xl font-bold text-white mt-0.5">10,000+</p>
                <p className="text-xs text-white/80">Hand-curated recipes & counting</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="team" className="py-20 lg:py-28 bg-[#FAF6EF]">
        <div className="layout-container">
          <p className="text-sm font-bold uppercase tracking-wider text-[#E8500B] mb-2">The People</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#1a1a1a] mb-12">Meet the Team</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map(member => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
          <div className="mt-12 border-2 border-[#1a1a1a] border-dashed p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex -space-x-3">
              {['?', '?', '?'].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-full bg-[#F0EAE0] border-2 border-[#1a1a1a] flex items-center justify-center text-xl font-bold text-[#1a1a1a] opacity-40">
                  +
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-bold text-[#1a1a1a]">We're hiring</h4>
              <p className="text-sm text-[#1a1a1a] opacity-60">Join us in building the future of home cooking.</p>
            </div>
            <a href="#" className="sm:ml-auto inline-flex items-center gap-2 rounded-full border-2 border-[#E8500B] px-5 py-2 text-sm font-bold text-[#E8500B] hover:bg-[#E8500B] hover:text-white transition-colors whitespace-nowrap">
              View Open Roles <ArrowRight weight="bold" />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1a1a1a]">
        <div className="layout-container">
          <p className="text-sm font-bold uppercase tracking-wider text-[#E8500B] mb-8 text-center">As Seen In</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-[#CDCBC0]/20">
            {PRESS.map((p, i) => (
              <div
                key={p.name}
                className={`p-8 border-[#CDCBC0]/20 hover:bg-[#E8500B]/10 transition-colors cursor-default ${i > 0 ? 'border-l-2' : ''}`}
              >
                <p className="text-lg font-bold text-white">{p.name}</p>
                <p className="mt-2 text-sm text-[#CDCBC0] italic">"{p.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#E8500B]">
        <div className="layout-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-wider text-white/70 mb-2">Stay in the Loop</p>
              <h2 className="text-4xl font-bold text-white leading-tight">
                New recipes.<br />New features.<br />
                <span className="text-[#1a1a1a]">Every week.</span>
              </h2>
              <p className="mt-4 text-white/80 text-lg">
                Join 50,000+ home cooks who get our weekly digest of trending recipes, kitchen tips, and platform updates.
              </p>
            </div>
            <div className="w-full max-w-md">
              {submitted ? (
                <div className="border-2 border-white p-8 text-center">
                  <p className="text-2xl font-bold text-white mb-2">You're in! 🎉</p>
                  <p className="text-white/80 text-sm">Check your inbox for a welcome email.</p>
                </div>
              ) : (
                <div className="border-2 border-white p-8">
                  <label className="block text-sm font-bold uppercase tracking-wider text-white mb-3">
                    Your Email
                  </label>
                  <div className="flex gap-0">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="flex-1 min-w-0 border-2 border-white bg-white/10 text-white placeholder-white/40 px-4 py-3 text-sm focus:outline-none focus:bg-white/20"
                    />
                      <button
                          onClick={() => email && setSubmitted(true)}
                          className="flex-shrink-0 border-2 border-white bg-white text-[#E8500B] px-6 py-3 text-sm font-bold hover:bg-[#FAF6EF] transition-colors whitespace-nowrap inline-flex items-center gap-2"
                          style={{ minWidth: 120 }}
                      >
                          Subscribe <ArrowRight weight="bold" />
                      </button>
                  </div>
                  <p className="mt-3 text-xs text-white/50">No spam. Unsubscribe any time.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
