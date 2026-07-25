import React, { useState } from 'react';
import { Share2, Link as LinkIcon, MessageSquare, Check } from 'lucide-react';

export default function ShareButton({ destinationName, days, travelType, budget, totalCost, itinerary }) {
  const [copied, setCopied] = useState(false);

  // Generate shareable URL with parameters
  const generateShareUrl = () => {
    const params = new URLSearchParams({
      dest: destinationName.toLowerCase(),
      days: days.toString(),
      type: travelType,
      budget: budget.toString()
    });
    return `${window.location.origin}/planner?${params.toString()}`;
  };

  const handleCopyLink = async () => {
    const url = generateShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleWhatsAppShare = () => {
    const shareUrl = generateShareUrl();
    
    // Create detailed message
    let activitiesStr = '';
    if (itinerary && itinerary.days) {
      activitiesStr = itinerary.days.map(day => {
        return `*Day ${day.day}*\n- ${day.activities.join('\n- ')}`;
      }).join('\n\n');
    }

    const text = `*Explore Tamil Nadu - Smart Travel Plan* 🧭\n\n*Destination:* ${destinationName}\n*Duration:* ${days} Days\n*Type:* ${travelType}\n*Total Cost:* ₹${totalCost}\n\n${activitiesStr}\n\nPlan yours here: ${shareUrl}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-brand-slate-100 hover:bg-brand-slate-200 dark:bg-brand-slate-800 dark:hover:bg-brand-slate-700 text-brand-slate-700 dark:text-brand-slate-200 border border-brand-slate-200 dark:border-brand-slate-700 transition-colors"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-500 animate-bounce" />
            <span>Copied Link!</span>
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppShare}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
      >
        <MessageSquare className="h-4 w-4" />
        <span>WhatsApp</span>
      </button>
    </div>
  );
}
