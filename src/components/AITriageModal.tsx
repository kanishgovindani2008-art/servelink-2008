import React, { useState } from 'react';
import { DIAGNOSTIC_PRESETS, Specialist } from '../data/mockData';

interface AITriageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPro: (proId: string) => void;
  specialists: Specialist[];
}

export const AITriageModal: React.FC<AITriageModalProps> = ({
  isOpen,
  onClose,
  onSelectPro,
  specialists
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<{
    diagnosis: string;
    confidence: string;
    category: string;
    costRange: string;
    recommendedPro: Specialist | null;
  } | null>(null);

  if (!isOpen) return null;

  const handleRunAnalysis = (textToAnalyze?: string) => {
    const query = (textToAnalyze ?? inputText).toLowerCase();
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);

      if (query.includes('ac') || query.includes('cool') || query.includes('leak') || query.includes('gas') || query.includes('voltas')) {
        const pro = specialists.find((p) => p.category === 'ac-repair') || specialists[1];
        setDiagnosisResult({
          diagnosis: 'Likely refrigerant underpressure (R32 / R410A) or condensate tray blockage',
          confidence: '95%',
          category: 'AC Repair & Diagnostics',
          costRange: '₹349 - ₹1,499',
          recommendedPro: pro
        });
      } else if (query.includes('mcb') || query.includes('trip') || query.includes('spark') || query.includes('electric') || query.includes('shock') || query.includes('switch')) {
        const pro = specialists.find((p) => p.category === 'electricians') || specialists[0];
        setDiagnosisResult({
          diagnosis: 'Neutral-earth leakage or overloaded C-curve circuit breaker tripping',
          confidence: '96%',
          category: 'Electrical Safety & Distribution',
          costRange: '₹299 - ₹450',
          recommendedPro: pro
        });
      } else if (query.includes('ather') || query.includes('brake') || query.includes('scooter') || query.includes('bike') || query.includes('motor') || query.includes('ev')) {
        const pro = specialists.find((p) => p.category === 'mechanics') || specialists[2];
        setDiagnosisResult({
          diagnosis: 'Worn disc pad friction lining rubbing against rotor or BMS sensor error',
          confidence: '97%',
          category: 'EV Mobility & Mechanics',
          costRange: '₹199 - ₹450',
          recommendedPro: pro
        });
      } else if (query.includes('pump') || query.includes('pipe') || query.includes('water') || query.includes('tap') || query.includes('drain')) {
        const pro = specialists.find((p) => p.category === 'plumbers') || specialists[3];
        setDiagnosisResult({
          diagnosis: 'Submersible starter capacitor discharge or pipeline acoustic impedance drop',
          confidence: '93%',
          category: 'Plumbing & Hydraulic Pumps',
          costRange: '₹249 - ₹650',
          recommendedPro: pro
        });
      } else {
        const pro = specialists[0];
        setDiagnosisResult({
          diagnosis: 'Multi-point inspection recommended by certified local technician',
          confidence: '91%',
          category: 'General Technical Diagnosis',
          costRange: '₹199 - ₹399',
          recommendedPro: pro
        });
      }
    }, 600);
  };

  const handlePresetClick = (preset: typeof DIAGNOSTIC_PRESETS[0]) => {
    setInputText(preset.query);
    handleRunAnalysis(preset.query);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setInputText(`Analyzing uploaded snapshot (${file.name}): surface inspection & wear assessment.`);
      handleRunAnalysis(`Uploaded snapshot: ${file.name} motor leak or thermal issue`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#213145]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl flex flex-col gap-4 border border-[#d3e4fe] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006194] text-[24px]">auto_fix_high</span>
            <div>
              <h3 className="font-display font-bold text-lg text-[#0b1c30]">Servelink Multimodal AI Assistant</h3>
              <p className="text-xs text-[#3f4850]">Direct Symptom-to-Technician Dispatch in Bhopal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-1 rounded-full text-[#3f4850] hover:bg-[#eff4ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Instructions */}
        <p className="text-xs sm:text-sm text-[#3f4850]">
          Type what is malfunctioning or upload a photo of the appliance, leakage, or fuse box. Our multimodal engine maps symptoms directly to verified Bhopal tradesmen.
        </p>

        {/* Text Input */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-[#eff4ff] rounded-xl p-3 text-sm text-[#0b1c30] placeholder:text-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194] border border-[#d3e4fe] transition-all resize-none"
            placeholder="Describe sound, smell, blinking lights, or liquid leaks... (e.g., 'Outdoor AC unit rattling and water leaking onto bedroom wall')"
            rows={3}
          />
        </div>

        {/* Image Attachment Preview */}
        {selectedImage && (
          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[#d3e4fe] bg-[#eff4ff] flex items-center justify-center">
            <img src={selectedImage} alt="Uploaded diagnostic snapshot" className="w-full h-full object-cover" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-black"
              title="Remove snapshot"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        )}

        {/* Quick Presets */}
        <div>
          <span className="text-[11px] font-semibold text-[#006194] uppercase tracking-wider block mb-1.5">
            Quick Symptom Presets:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {DIAGNOSTIC_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handlePresetClick(p)}
                className="text-xs bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] px-2.5 py-1 rounded-lg border border-[#d3e4fe] transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* File Upload Trigger */}
        <div className="flex items-center justify-between text-xs text-[#3f4850] pt-1">
          <label className="flex items-center gap-1.5 cursor-pointer text-[#006194] hover:underline font-medium">
            <span className="material-symbols-outlined text-[18px]">add_a_photo</span>
            <span>Attach photo of machine / meter / leak</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <button
            type="button"
            onClick={() => handleRunAnalysis()}
            disabled={!inputText.trim() && !selectedImage}
            className="px-3 py-1.5 bg-[#006194] text-white rounded-lg text-xs font-semibold hover:bg-[#007bb9] disabled:opacity-50 transition-colors"
          >
            {isAnalyzing ? 'Analyzing...' : 'Diagnose'}
          </button>
        </div>

        {/* AI Live Suggestions Box */}
        {diagnosisResult && (
          <div className="bg-[#eff4ff] border border-[#d3e4fe] p-3.5 rounded-xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#006194] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Instant AI Diagnosis
              </span>
              <span className="text-[11px] bg-[#7ffc97] text-[#002109] px-2 py-0.5 rounded-full font-bold">
                {diagnosisResult.confidence} Confidence
              </span>
            </div>

            <p className="text-xs text-[#0b1c30] font-medium leading-relaxed">
              <strong>Likely Issue:</strong> {diagnosisResult.diagnosis}
            </p>

            <div className="flex items-center justify-between text-xs text-[#3f4850] pt-1 border-t border-[#d3e4fe]">
              <span>Estimated Cost: <strong className="text-[#006194]">{diagnosisResult.costRange}</strong></span>
              <span>Category: <strong>{diagnosisResult.category}</strong></span>
            </div>

            {diagnosisResult.recommendedPro && (
              <div className="mt-2 p-2.5 bg-white rounded-lg border border-[#cce5ff] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={diagnosisResult.recommendedPro.avatar}
                    alt={diagnosisResult.recommendedPro.name}
                    className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#0b1c30]">
                      {diagnosisResult.recommendedPro.name}
                    </h4>
                    <p className="text-[11px] text-[#3f4850]">
                      {diagnosisResult.recommendedPro.role} • {diagnosisResult.recommendedPro.distanceKm} km away
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (diagnosisResult.recommendedPro) {
                      onSelectPro(diagnosisResult.recommendedPro.id);
                    }
                  }}
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-sm transition-colors"
                >
                  Book Specialist
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#eff4ff]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#3f4850] hover:text-[#0b1c30] transition-colors"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (diagnosisResult?.recommendedPro) {
                onClose();
                onSelectPro(diagnosisResult.recommendedPro.id);
              } else {
                handleRunAnalysis();
              }
            }}
            className="bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
            type="button"
          >
            {diagnosisResult ? 'Route to Best Pro' : 'Diagnose & Route'}
          </button>
        </div>
      </div>
    </div>
  );
};
