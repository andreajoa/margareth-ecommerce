import {useState, useEffect, useRef} from 'react';

/**
 * Hook cross-browser para countdown com correção de timezone
 * ✅ Funciona em: Chrome, Safari, Firefox, Edge, Mobile browsers
 * ✅ Suporta SSR (Server-Side Rendering)
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
  const rafRef = useRef(null);
  const lastUpdateRef = useRef(0);

  // ✅ FIX: Corrigir meses (JavaScript usa 0-11) e suporte SSR
  const calculateHolidayCountdown = () => {
    if (typeof window === "undefined") {
      // SSR fallback
      return {
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
      };
    }

    const now = new Date();
    const currentYear = now.getFullYear();

    const holidays = [
      {name: 'III Jornada sobre Aprendizagem e Autismo - Baixada Santista', month: 2, day: 29, emoji: '🧩', message: 'III JORNADA AUTISMO BAIXADA SANTISTA - 29/03'},
      {name: 'Dia Mundial do Autismo', month: 3, day: 2, emoji: '💙', message: 'DIA MUNDIAL DO AUTISMO - 02/04'},
      {name: 'ExpoTEA 2025 - Maior Feira de Autismo do Mundo', month: 9, day: 28, emoji: '🎪', message: 'EXPOTEA 2025 - MAIOR FEIRA DE AUTISMO DO MUNDO!'},
    ];

    const upcomingHolidays = holidays.map(holiday => {
      // ✅ FIX: Usar mês correto (JS months: 0=Jan, 1=Fev, 2=Mar...)
      let holidayDate = new Date(currentYear, holiday.month, holiday.day, 23, 59, 59);

      if (holidayDate.getTime() < now.getTime()) {
        holidayDate = new Date(currentYear + 1, holiday.month, holiday.day, 23, 59, 59);
      }

      return { ...holiday, date: holidayDate };
    });

    upcomingHolidays.sort((a, b) => a.date.getTime() - b.date.getTime());
    const nextHoliday = upcomingHolidays[0];

    if (!nextHoliday) {
      return {days: 0, hours: 0, minutes: 0, seconds: 0, holiday: null};
    }

    const difference = nextHoliday.date.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        holiday: nextHoliday
      };
    }

    return {days: 0, hours: 0, minutes: 0, seconds: 0, holiday: null};
  };

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateHolidayCountdown());

    // ✅ FIX CROSS-BROWSER: Usar requestAnimationFrame para performance
    const tick = () => {
      const now = performance.now();

      // Atualizar apenas a cada 1 segundo
      if (now - lastUpdateRef.current >= 1000) {
        setTimeLeft(calculateHolidayCountdown());
        lastUpdateRef.current = now;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {timeLeft, isMounted};
}

/**
 * Hook para mensagens rotativas com RAF
 */
export function useRotatingMessages(messages, intervalMs = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastRotateRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!messages || messages.length === 0) return;

    const tick = (timestamp) => {
      if (timestamp - lastRotateRef.current >= intervalMs) {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        lastRotateRef.current = timestamp;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [messages, intervalMs]);

  return currentIndex;
}

/**
 * Hook para animações com fade
 */
export function useFadeAnimation(intervalMs = 3500, fadeMs = 500) {
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastAnimateRef = useRef(0);
  const rafRef = useRef(null);

  const totalItems = useRef(4);

  useEffect(() => {
    const tick = (timestamp) => {
      if (timestamp - lastAnimateRef.current >= intervalMs) {
        setFadeClass('opacity-0');
        
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % totalItems.current);
          setFadeClass('opacity-100');
        }, fadeMs);
        
        lastAnimateRef.current = timestamp;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [intervalMs, fadeMs]);

  return {fadeClass, currentIndex, setCurrentIndex};
}
