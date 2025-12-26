import React, { useState } from 'react';
import { 
  HelpCircle, 
  Mail, 
  MessageCircle, 
  Phone, 
  ChevronDown, 
  Send, 
  CheckCircle2 
} from 'lucide-react';

const Support = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: "How long does it take to resolve a complaint?",
      a: "Most complaints are acknowledged within 24 hours. The total resolution time depends on the complexity, but we aim for 3-5 business days."
    },
    {
      q: "Can I remain anonymous when reporting an issue?",
      a: "Yes. When submitting a ticket, you can select the 'Private' option, though identifying details may be required for specific administrative actions."
    },
    {
      q: "What if I am not satisfied with the resolution?",
      a: "You can 'Re-open' a ticket within 48 hours of it being marked as resolved if you feel the solution was insufficient."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-20 pb-20">
      
      {/* --- Section 1: Header --- */}
      <section className="text-center pt-10">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
          How can we <span className="text-blue-600">help you?</span>
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Search our knowledge base or reach out to our dedicated support team directly.
        </p>
      </section>

      <div className="grid lg:grid-cols-3 gap-12">
        
        {/* --- Section 2: FAQ Accordion (Left 2/3) --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="text-blue-600" />
            <h2 className="text-2xl font-bold dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden transition-all shadow-sm"
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-gray-800 dark:text-gray-200">{faq.q}</span>
                  <ChevronDown className={`transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} size={20} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${activeFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                  <p className="px-6 pb-6 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Section 3: Contact Sidebar (Right 1/3) --- */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-500/20">
            <h3 className="text-xl font-bold mb-2">Direct Contact</h3>
            <p className="text-blue-100 text-sm mb-6">Average response time: 2 hours</p>
            
            <div className="space-y-4">
              <a href="mailto:support@uscms.edu" className="flex items-center gap-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                <Mail size={18} />
                <span className="text-sm font-medium">tsediatgstu@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 p-3 bg-white/10 rounded-xl">
                <Phone size={18} />
                <span className="text-sm font-medium">+1 (555) 012-3456</span>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Send a Message</h3>
            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="inline-flex p-3 bg-emerald-100 text-emerald-600 rounded-full animate-bounce">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-sm font-bold text-emerald-600">Message Sent!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all" 
                  required
                />
                <textarea 
                  placeholder="How can we help?" 
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-600 dark:text-white h-32 resize-none transition-all"
                  required
                />
                <button className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;