import { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Onboarding({ onComplete, onSkip }) {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({ city, state });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[var(--card-bg)] border border-[var(--accent)] rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(75,0,130,0.3)]"
      >
        <div className="w-16 h-16 bg-[var(--accent)] rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <MapPin className="text-white" size={32} />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2 text-[var(--text-primary)]">Ajude a comunidade!</h2>
        <p className="text-[var(--text-secondary)] text-center mb-8">
          Informe sua localização para receber dicas de troca inteligentes baseadas nas figurinhas da sua região.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Cidade</label>
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ex: Recife"
              className="w-full bg-[var(--bg-color)] border border-[var(--card-border)] rounded-xl p-4 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Estado (UF)</label>
            <input 
              type="text" 
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Ex: PE"
              maxLength={2}
              className="w-full bg-[var(--bg-color)] border border-[var(--card-border)] rounded-xl p-4 text-[var(--text-primary)] focus:border-[var(--accent)] outline-none transition-all uppercase"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-[var(--accent)] to-[#8A2BE2] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mt-6 shadow-lg shadow-purple-900/20"
          >
            Começar a Colecionar
            <ArrowRight size={20} />
          </button>
        </form>
        
        <button 
          onClick={onSkip}
          className="w-full text-[var(--text-secondary)] text-sm mt-4 hover:text-[var(--text-primary)] transition-colors"
        >
          Pular por enquanto
        </button>
      </motion.div>
    </div>
  );
}
