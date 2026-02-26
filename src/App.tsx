import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call for the preview environment
    // In production, this would be: await fetch('/api/send-email', { ... })
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const copyCode = () => {
    const code = `// Example frontend fetch call
const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    phone: "555-1234",
    message: "I need an estimate for a new driveway."
  }),
});

const data = await response.json();`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-orange-200">
      {/* Header */}
      <header className="bg-stone-900 text-white py-6 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-orange-500 uppercase">Sullivan's Excavating</h1>
            <p className="text-stone-400 text-sm">Professional Earthwork & Site Prep</p>
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Phone size={16} />
              (555) 123-4567
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Mail size={16} />
              info@sullivansexcavating.com
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
        {/* Left Column: Form Demo */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Request an Estimate</h2>
            <p className="text-stone-600">
              Fill out the form below to request a quote for your next project. 
              This is a demo of how the form will look on your website.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-stone-200">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    <Send size={18} />
                    Send Request
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="p-4 bg-emerald-50 text-emerald-700 rounded-lg flex items-start gap-3 mt-4">
                  <CheckCircle className="shrink-0 mt-0.5" size={18} />
                  <p className="text-sm">Thank you! Your message has been sent. We'll get back to you shortly.</p>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3 mt-4">
                  <AlertCircle className="shrink-0 mt-0.5" size={18} />
                  <p className="text-sm">There was an error sending your message. Please try again later.</p>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Vercel Instructions */}
        <div className="space-y-8">
          <div className="bg-stone-900 text-stone-300 p-6 md:p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
              Vercel Function Created
            </h3>
            <p className="mb-4 text-sm">
              I've created the serverless function at <code className="bg-stone-800 text-orange-400 px-1.5 py-0.5 rounded">api/send-email.ts</code>. 
              When deployed to Vercel, this file automatically becomes an API endpoint at <code className="bg-stone-800 text-orange-400 px-1.5 py-0.5 rounded">/api/send-email</code>.
            </p>
            
            <h3 className="text-xl font-bold text-white mb-4 mt-8 flex items-center gap-2">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
              Environment Variables
            </h3>
            <p className="mb-4 text-sm">
              In your Vercel project dashboard, go to <strong>Settings &gt; Environment Variables</strong> and add:
            </p>
            <ul className="space-y-2 text-sm font-mono bg-stone-800 p-4 rounded-lg">
              <li><span className="text-orange-400">RESEND_API_KEY</span> = re_your_api_key...</li>
              <li><span className="text-orange-400">TO_EMAIL</span> = info@sullivansexcavating.com</li>
              <li><span className="text-orange-400">FROM_EMAIL</span> = noreply@sullivansexcavating.com</li>
            </ul>

            <h3 className="text-xl font-bold text-white mb-4 mt-8 flex items-center gap-2">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
              Frontend Integration
            </h3>
            <p className="mb-4 text-sm">
              Use this code in your frontend to call the function:
            </p>
            <div className="relative">
              <pre className="bg-stone-800 p-4 rounded-lg text-sm overflow-x-auto text-stone-300 font-mono">
{`const response = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    phone: "555-1234",
    message: "I need an estimate."
  }),
});`}
              </pre>
              <button 
                onClick={copyCode}
                className="absolute top-2 right-2 p-2 bg-stone-700 hover:bg-stone-600 rounded-md transition-colors text-white"
                title="Copy code"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
