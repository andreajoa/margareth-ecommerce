import {useState, useEffect, useRef} from 'react';

/**
 * Hook cross-browser para countdown
 * ✅ Chrome, Safari, Firefox, Edge, iOS Safari, Android
 * ✅ SSR safe (Shopify Hydrogen/Oxygen)
 * ✅ Funciona em background tabs
 */
export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    holiday: {
      name: 'Carregando...',
      emoji: '🎉',
      message: 'COUNTDOWN'
    }
  });
  const [isMounted, setIsMounted] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const year = now.getFullYear();

      // IMPORTANTE: Em JavaScript, meses são 0-indexed!
      // Janeiro=0, Fevereiro=1, Março=2, Abril=3, ..., Outubro=9, Novembro=10
      const holidays = [
        {
          name: 'III Jornada sobre Aprendizagem e Autismo - Baixada Santista',
          date: new Date(2025, 2, 29, 23, 59, 59),  // 29 de Março de 2025
          emoji: '🧩',
          message: 'III JORNADA AUTISMO BAIXADA SANTISTA - 29/03'
        },
        {
          name: 'Dia Mundial do Autismo',
          date: new Date(2025, 3, 2, 23, 59, 59),   // 2 de Abril de 2025
          emoji: '💙',
          message: 'DIA MUNDIAL DO AUTISMO - 02/04'
        },
        {
          name: 'ExpoTEA 2025',
          date: new Date(2025, 10, 28, 23, 59, 59),  // 28 de Novembro de 2025
          emoji: '🎪',
          message: 'EXPOTEA 2025 - MAIOR FEIRA DE AUTISMO DO MUNDO!'
        },
      ];

      // Filtra apenas eventos futuros
      const future = holidays
        .filter(h => h.date.getTime() > now.getTime())
        .sort((a, b) => a.date - b.date);

      // Se não tem eventos futuros em 2025, adiciona para 2026
      if (future.length === 0) {
        const nextYear = [
          {
            name: 'Dia Mundial do Autismo',
            date: new Date(year + 1, 3, 2, 23, 59, 59),
            emoji: '💙',
            message: 'DIA MUNDIAL DO AUTISMO - 02/04'
          },
        ];
        future.push(...nextYear);
      }

      const next = future[0];
      const diff = next.date.getTime() - now.getTime();

      if (diff > 0) {
        return {
          days:    Math.floor(diff / 86400000),
          hours:   Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
          holiday: next,
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0, holiday: next };
    };

    // Calcula imediatamente
    setTimeLeft(calculate());
    setIsMounted(true);

    // Atualiza a cada segundo
    intervalRef.current = setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return { timeLeft, isMounted };
}

/**
 * Hook para mensagens rotativas
 */
export function useRotatingMessages(messages, intervalMs) {
  const ms = intervalMs || 4000;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const id = setInterval(() => {
      setCurrentIndex(function(prev) { return (prev + 1) % messages.length; });
    }, ms);
    return () => clearInterval(id);
  }, [messages, ms]);

  return currentIndex;
}

/**
 * Hook para animações com fade
 */
export function useFadeAnimation(intervalMs, fadeMs) {
  const interval = intervalMs || 3500;
  const fade = fadeMs || 500;
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = useRef(4);

  useEffect(() => {
    const id = setInterval(() => {
      setFadeClass('opacity-0');
      setTimeout(() => {
        setCurrentIndex(function(prev) { return (prev + 1) % total.current; });
        setFadeClass('opacity-100');
      }, fade);
    }, interval);
    return () => clearInterval(id);
  }, [interval, fade]);

  return { fadeClass: fadeClass, currentIndex: currentIndex, setCurrentIndex: setCurrentIndex };
}
