'use client';

import { useState, useEffect, useRef } from 'react';

interface BlogAudioPlayerProps {
  title: string;
  readTime: string;
  textToRead: string;
}

export function BlogAudioPlayer({ title, readTime, textToRead }: BlogAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
      return;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!supported || typeof window === 'undefined') return;

    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      return;
    }

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = `${title}. ... Estimated reading time: ${readTime}. ... ${textToRead.replace(/<[^>]*>?/gm, ' ')}`;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Try finding an English Indian or calm English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en-IN')) || voices.find(v => v.lang.startsWith('en'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const cycleSpeed = () => {
    const nextRate = rate === 1 ? 1.25 : rate === 1.25 ? 1.5 : 1;
    setRate(nextRate);
    if (isPlaying && utteranceRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--line)',
        borderRadius: 14,
        padding: '16px 22px',
        margin: '24px 0 32px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        boxShadow: '0 2px 10px rgba(43, 37, 32, 0.03)'
      }}
      role="region"
      aria-label="Audio narration for this article"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause audio reading' : 'Listen to this article'}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--espresso)',
            color: '#F7EFE8',
            border: 'none',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
            fontSize: '1.1rem',
            transition: 'all .2s ease',
            flexShrink: 0
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <div>
          <span style={{ fontSize: '.88rem', fontWeight: 700, color: 'var(--espresso)', display: 'block' }}>
            {isPlaying ? 'Now Playing Narration' : '🎧 Listen to this article'}
          </span>
          <span style={{ fontSize: '.78rem', color: 'var(--mut)' }}>
            Speech audio ({readTime}) · Web Speech
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {isPlaying && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }} aria-hidden="true">
            <span style={{ width: 3, height: 16, background: 'var(--sage)', borderRadius: 2, animation: 'pulse 1s infinite alternate' }} />
            <span style={{ width: 3, height: 22, background: 'var(--sage)', borderRadius: 2, animation: 'pulse 1.3s infinite alternate' }} />
            <span style={{ width: 3, height: 12, background: 'var(--sage)', borderRadius: 2, animation: 'pulse .8s infinite alternate' }} />
          </div>
        )}
        <button
          type="button"
          onClick={cycleSpeed}
          title="Change playback speed"
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--line)',
            borderRadius: 999,
            padding: '5px 12px',
            fontSize: '.78rem',
            fontWeight: 700,
            color: 'var(--espresso)',
            cursor: 'pointer'
          }}
        >
          {rate}x speed
        </button>
      </div>
    </div>
  );
}
