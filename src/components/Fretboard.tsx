/**
 * Fretboard Component
 *
 * A React component that renders an interactive guitar fretboard.
 *
 * Props:
 * - strings: number - Number of strings on the fretboard (e.g., 6 for standard guitar)
 * - frets: number - Number of frets to display
 * - annotations: Annotation[] - Array of annotations to display on the fretboard
 *   Each annotation contains: { string: number, fret: number, label?: string }
 * - viewMode: 'full' | 'boxes' - Display mode for the fretboard
 *   'full' shows the entire fretboard, 'boxes' shows CAGED box patterns
 * - onNoteClick: (string: number, fret: number) => void - Callback when a note is clicked
 */

import React from "react";

/**
 * Represents an annotation on the fretboard
 */
export interface Annotation {
  /** String number (1-based, 1 is the highest pitched string) */
  string: number;
  /** Fret number (0 for open string) */
  fret: number;
  /** Optional label to display on the annotation */
  label?: string;
}

/**
 * Props for the Fretboard component
 */
export interface FretboardProps {
  /** Number of strings (default: 6) */
  strings: number;
  /** Number of frets to display (default: 12) */
  frets: number;
  /** Annotations to display on the fretboard */
  annotations: Annotation[];
  /** View mode: 'full' for entire fretboard, 'boxes' for CAGED patterns */
  viewMode: "full" | "boxes";
  /** Callback when a note position is clicked */
  onNoteClick: (string: number, fret: number) => void;
}

/**
 * Fretboard component - renders an interactive guitar fretboard
 *
 * @example
 * ```tsx
 * <Fretboard
 *   strings={6}
 *   frets={12}
 *   annotations={[{ string: 1, fret: 5, label: "A" }]}
 *   viewMode="full"
 *   onNoteClick={(s, f) => console.log(`Clicked string ${s}, fret ${f}`)}
 * />
 * ```
 */
export const Fretboard: React.FC<FretboardProps> = ({
  strings,
  frets,
  annotations,
  viewMode,
  onNoteClick,
}) => {
  const handleNoteClick = (stringNum: number, fretNum: number) => {
    onNoteClick(stringNum, fretNum);
  };

  const getAnnotation = (
    stringNum: number,
    fretNum: number
  ): Annotation | undefined => {
    return annotations.find((a) => a.string === stringNum && a.fret === fretNum);
  };

  return (
    <div
      className={`fretboard fretboard--${viewMode}`}
      data-testid="fretboard"
      role="grid"
      aria-label="Guitar fretboard"
    >
      {Array.from({ length: strings }, (_, stringIndex) => {
        const stringNum = stringIndex + 1;
        return (
          <div
            key={stringNum}
            className="fretboard__string"
            data-testid={`string-${stringNum}`}
            role="row"
          >
            {Array.from({ length: frets + 1 }, (_, fretNum) => {
              const annotation = getAnnotation(stringNum, fretNum);
              const hasAnnotation = !!annotation;

              return (
                <button
                  key={fretNum}
                  className={`fretboard__note ${hasAnnotation ? "fretboard__note--annotated" : ""}`}
                  data-testid={`note-${stringNum}-${fretNum}`}
                  data-fret={fretNum}
                  onClick={() => handleNoteClick(stringNum, fretNum)}
                  aria-label={`String ${stringNum}, fret ${fretNum}${annotation?.label ? `, ${annotation.label}` : ""}`}
                  role="gridcell"
                >
                  {annotation?.label || ""}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Fretboard;
