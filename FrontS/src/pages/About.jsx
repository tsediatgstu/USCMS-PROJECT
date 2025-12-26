import React from 'react';
import { ShieldCheck, Users, Zap, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: "Active Students", value: "10,000+" },
    { label: "Issues Resolved", value: "2,500+" },
    { label: "Response Time", value: "< 24hrs" },
    { label: "Satisfaction", value: "98%" }
  ];

  const values = [
    {
      icon: <ShieldCheck className="text-blue-600" size={24} />,
      title: "Data Privacy",
      desc: "Your complaints are handled with absolute confidentiality and secure encryption."
    },
    {
      icon: <Zap className="text-amber-500" size={24} />,
      title: "Rapid Action",
      desc: "Our automated routing ensures your issue reaches the right department instantly."
    },
    {
      icon: <Users className="text-emerald-500" size={24} />,
      title: "Student Centric",
      desc: "Built by students, for students, to ensure every voice at USCMS is heard."
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative text-center py-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-4xl h-64 bg-blue-100 dark:bg-blue-900/10 blur-[120px] rounded-full"></div>
        
        <span className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest">
          Our Mission
        </span>
        <h1 className="mt-6 text-5xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tighter">
          Transparency in <br />
          <span className="text-blue-600">University Living.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
          USCMS is a state-of-the-art Student Complaint Management System designed to bridge the gap between students and university administration through technology.
        </p>
      </section>

      {/* 2. Stats Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center p-8 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="text-3xl font-black text-blue-600 mb-1">{stat.value}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* 3. Core Values */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Why Choose USCMS?</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">We prioritize efficiency and accountability above all else.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <div key={i} className="group p-10 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/5">
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{val.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The Process (Visual) */}
      <section className="bg-gray-900 dark:bg-blue-900/10 rounded-[3rem] p-10 md:p-20 text-white">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black tracking-tight mb-8">How it works.</h2>
            <div className="space-y-6">
              {[
                "Submit your complaint via our secure portal.",
                "Automatic assignment to the relevant department head.",
                "Real-time tracking of the resolution status.",
                "Provide feedback once your issue is resolved."
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-600 rounded-full p-1">
                    <CheckCircle2 size={16} />
                  </div>
                  <p className="text-gray-300 font-medium">{text}</p>
                </div>
              ))}
            </div>
            <Link to="/register" className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-50 transition-colors">
              Get Started Now <ArrowRight size={20} />
            </Link>
          </div>
          <div className="relative hidden md:block">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-96 rounded-[2.5rem] rotate-3 shadow-2xl"></div>
            <div className="absolute inset-0 bg-gray-800 h-96 rounded-[2.5rem] -rotate-3 border border-white/10 flex items-center justify-center">
                <Award size={80} className="text-blue-500 opacity-20" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;