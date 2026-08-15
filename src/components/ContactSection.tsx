import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AccentColor } from '../types';
import { ArrowUpRight, Mail, CheckCircle2, Sparkles, Send, Copy, Check, MapPin, Clock, Github, Linkedin, Download } from 'lucide-react';

interface ContactSectionProps {
  accentColor: AccentColor;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  accentColor
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 4000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDownloadPortfolio = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(PERSONAL_INFO, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "raj-mandal-portfolio.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="contact-section" className="py-24 relative bg-[#040605] border-t border-emerald-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">
                <span className="w-6 h-px bg-emerald-400" />
                <span>Contact & Opportunities</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Connect</span>
              </h2>
              <p className="text-zinc-400 text-sm mt-3 font-sans leading-relaxed">
                Ready to build intelligent AI systems together? Open to freelance projects, research collaborations, internships, and full-time AI/ML opportunities.
              </p>
            </div>

            {/* Information Cards */}
            <div className="space-y-3 font-mono text-xs">
              <div
                onClick={handleCopyEmail}
                className="p-4 rounded-2xl bg-[#080D0A]/90 border border-emerald-900/40 hover:border-emerald-400 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-zinc-500">Email Address</p>
                    <p className="text-white font-bold group-hover:text-emerald-300 transition-colors">{PERSONAL_INFO.email}</p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-500/30">
                  {copiedEmail ? 'Copied! ✓' : 'Click to Copy'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#080D0A]/90 border border-emerald-900/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-zinc-500">Location</p>
                  <p className="text-white font-bold">{PERSONAL_INFO.location}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#080D0A]/90 border border-emerald-900/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-zinc-500">Timezone & Availability</p>
                  <p className="text-white font-bold">IST (GMT+5:30) • Available 9am–10pm</p>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl bg-black/80 border border-emerald-900/50 hover:border-emerald-400 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
              >
                <Github className="w-4 h-4 text-emerald-400" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl bg-black/80 border border-emerald-900/50 hover:border-emerald-400 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
              </a>

              <button
                onClick={handleDownloadPortfolio}
                className="px-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-black font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          {/* Right Direct Message Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-[#080D0A]/95 border border-emerald-900/50 shadow-2xl relative">
            <h3 className="text-xl font-bold font-mono text-white mb-1">Send a Message</h3>
            <p className="text-xs font-mono text-zinc-400 mb-6">I typically respond within 24 hours.</p>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold font-mono text-white">Message Sent Successfully!</h4>
                <p className="text-xs font-mono text-zinc-400 max-w-sm mx-auto">
                  Thank you for reaching out. Raj Mandal will review your message and reply via email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase text-zinc-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-emerald-900/50 text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-zinc-400 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-emerald-900/50 text-white text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase text-zinc-400 block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="ML Collaboration / Internship / Project"
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-emerald-900/50 text-white text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase text-zinc-400 block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project, timeline, or opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-black/80 border border-emerald-900/50 text-white text-xs focus:outline-none focus:border-emerald-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-emerald-500 text-black font-bold text-xs tracking-wider uppercase hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <span>Send Direct Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
