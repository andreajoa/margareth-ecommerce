/**
 * TEA & TDAH Color Palette
 * 🧩 Based on Autism Awareness Ribbon Colors - Puzzle Pieces Theme
 *
 * Main Blue Background: #87CEEB (Sky Blue) - Calming, professional
 * Ribbon Colors: Red, Yellow, Blue puzzle pieces
 * Primary: #4A90E2 (Bright Blue)
 * Accent Colors: #FF6B6B (Coral Red), #FFD93D (Bright Yellow), #6BCF7F (Green)
 */

export const teaColors = {
  // ═══════════════════════════════════════════════════════════════
  // MAIN BLUE - Primary Background Color (Dominant)
  // ═══════════════════════════════════════════════════════════════
  skyBlue: '#87CEEB',           // Main background blue - Calming, professional
  brightBlue: '#4A90E2',        // Primary action color - Bright Blue
  deepBlue: '#2B88D9',          // Darker blue for depth and hover states
  darkerBlue: '#1A5F7A',        // Very dark blue for text

  // ═══════════════════════════════════════════════════════════════
  // PUZZLE PIECE RIBBON COLORS (Autism Awareness)
  // ═══════════════════════════════════════════════════════════════
  coralRed: '#FF6B6B',          // Puzzle piece Red accent
  brightYellow: '#FFD93D',      // Puzzle piece Yellow accent
  puzzleBlue: '#5DADE2',        // Puzzle piece Blue accent (lighter variant)

  // ═══════════════════════════════════════════════════════════════
  // Supporting Accent Colors
  // ═══════════════════════════════════════════════════════════════
  green: '#6BCF7F',             // Success/positive accent
  orange: '#FF9F43',            // Additional warm accent

  // ═══════════════════════════════════════════════════════════════
  // Neutral Colors
  // ═══════════════════════════════════════════════════════════════
  white: '#FFFFFF',
  offWhite: '#FEFDF8',
  cream: '#FFF9ED',
  lightGray: '#F8F9FA',
  mediumGray: '#E9ECEF',
  darkText: '#2C3E50',          // Primary text color
  mutedText: '#6B7280',         // Secondary text
  softBlack: '#1A1A1A',

  // ═══════════════════════════════════════════════════════════════
  // Semantic Colors
  // ═══════════════════════════════════════════════════════════════
  success: '#6BCF7F',
  warning: '#FFD93D',
  error: '#FF6B6B',
  info: '#4A90E2',

  // ═══════════════════════════════════════════════════════════════
  // Special Gradients for Puzzle Theme
  // ═══════════════════════════════════════════════════════════════
  skyGradient: 'linear-gradient(135deg, #87CEEB 0%, #4A90E2 100%)',
  blueGradient: 'linear-gradient(135deg, #4A90E2 0%, #2B88D9 100%)',
  puzzleGradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 50%, #4A90E2 100%)',
  warmGradient: 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)',
  successGradient: 'linear-gradient(135deg, #6BCF7F 0%, #4CAF50 100%)',
  calmingGradient: 'linear-gradient(135deg, #87CEEB 0%, #6BCF7F 100%)',

  // ═══════════════════════════════════════════════════════════════
  // Puzzle Piece Shadows & Effects
  // ═══════════════════════════════════════════════════════════════
  puzzleShadow: 'rgba(135, 206, 235, 0.3)',
  puzzleShadowDark: 'rgba(74, 144, 226, 0.2)',
  glow: '0 0 20px rgba(135, 206, 235, 0.5)',

  // ═══════════════════════════════════════════════════════════════
  // Helper Functions for Dynamic Coloring
  // ═══════════════════════════════════════════════════════════════
  withOpacity(color, opacity) {
    // Returns color with opacity (0-1)
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },

  // Puzzle piece color combinations
  puzzlePieces: ['#FF6B6B', '#FFD93D', '#4A90E2', '#6BCF7F', '#87CEEB'],

  // Get random puzzle piece color
  randomPuzzleColor() {
    return this.puzzlePieces[Math.floor(Math.random() * this.puzzlePieces.length)];
  }
};

export default teaColors;
