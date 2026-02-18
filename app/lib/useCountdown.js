import {useState, useEffect, useRef} from 'react';

/**
 * Hook cross-browser para countdown
 * ✅ Chrome, Safari, Firefox, Edge, iOS Safari, Android
 * ✅ SSR safe (Shopify Hydrogen/Oxygen)
 * ✅ Funciona em background tabs
 * ✅ Sem dependência de performance.now() problemático no iOS
 */
export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    holiday: {
      name: 'III Jornada sobre Aprendizagem e Autismo - Baixada Santista',
      month: 2,
      day: 29,
      emoji: '🧩',
      message: 'III JORNADA AUTISMO BAIXADA SANTISTA - 29/03'
    }
  });
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef(null);

  const calculateTimeLeft = () => {
    // SSR guard
    if (typeof window === 'undefined') return null;

    const now = new Date();
    const year = now.getFullYear();

    // Holidays - meses em JS são 0-indexed (0=Jan, 2=Mar, 3=Apr, 9=Oct)
    const holidays = [
      {
        name: 'III Jornada sobre Aprendizagem e Autismo - Baixada Santista',
        month: 2,   // Março
        day: 29,
        emoji: '🧩',
        message: 'III JORNADA AUTISMO BAIXADA SANTISTA - 29/03'
      },
      {
        name: 'Dia Mundial do Autismo',
        month: 3,   // Abril
        day: 2,
        emoji: '💙',
        message: 'DIA MUNDIAL DO AUTISMO - 02/04'
      },
      {
        name: 'ExpoTEA 2025',
        month: 9,   // Outubro
        day: 28,
        emoji: '🎪',
        message: 'EXPOTEA 2025 - MAIOR FEIRA DE AUTISMO DO MUNDO!'
      },
    ];

    // Encontra próximo evento
    const upcoming = holidays
      .map(h => {
        let date = new Date(year, h.month, h.day, 23, 59, 59);
        if (date.getTime() <= now.getTime()) {
          date = new Date(year + 1, h.month, h.day, 23, 59, 59);
        }
        return { ...h, date };
      })
      .sort((a, b) => a.date - b.date);

    const next = upcoming[0];
    if (!next) return null;

    const diff = next.date.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, holiday: next };
    }

    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      holiday: next,
    };
  };

  useEffect(() => {
    // Calcula imediatamente ao montar
    const initial = calculateTimeLeft();
    if (initial) {
      setTimeLeft(initial);
    }
    setIsMounted(true);

    // Usa setInterval simples - mais confiável que RAF para timers
    // RAF pausa em background tabs, setInterval não
    intervalRef.current = setInterval(() => {
      const result = calculateTimeLeft();
      if (result) {
        setTimeLeft(result);
      }
    }, 1000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Sem dependências - roda só uma vez

  return { timeLeft, isMounted };
}

/**
 * Hook para mensagens rotativas
 */
export function useRotatingMessages(messages, intervalMs = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const id = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % messages.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [messages, intervalMs]);

  return currentIndex;
}

/**
 * Hook para animações com fade
 */
export function useFadeAnimation(intervalMs = 3500, fadeMs = 500) {
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = useRef(4);

  useEffect(() => {
    const id = setInterval(() => {
      setFadeClass('opacity-0');
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % total.current);
        setFadeClass('opacity-100');
      }, fadeMs);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, fadeMs]);

  return { fadeClass, currentIndex, setCurrentIndex };
}
