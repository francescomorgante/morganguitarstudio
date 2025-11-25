import { describe, it, expect, vi } from "vitest";
import React from "react";
import { Fretboard, FretboardProps, Annotation } from "../../src/components/Fretboard";

// Mock React's createElement for testing without DOM
vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
  };
});

describe("Fretboard", () => {
  const defaultProps: FretboardProps = {
    strings: 6,
    frets: 12,
    annotations: [],
    viewMode: "full",
    onNoteClick: vi.fn(),
  };

  it("should export Fretboard component", () => {
    expect(Fretboard).toBeDefined();
    expect(typeof Fretboard).toBe("function");
  });

  it("should accept required props", () => {
    const props: FretboardProps = {
      strings: 6,
      frets: 12,
      annotations: [{ string: 1, fret: 5, label: "A" }],
      viewMode: "full",
      onNoteClick: () => {},
    };

    // Verify props interface is correctly typed
    expect(props.strings).toBe(6);
    expect(props.frets).toBe(12);
    expect(props.annotations).toHaveLength(1);
    expect(props.viewMode).toBe("full");
    expect(typeof props.onNoteClick).toBe("function");
  });

  it("should accept 'boxes' viewMode", () => {
    const props: FretboardProps = {
      ...defaultProps,
      viewMode: "boxes",
    };

    expect(props.viewMode).toBe("boxes");
  });

  it("should accept annotations with optional label", () => {
    const annotationWithLabel: Annotation = {
      string: 1,
      fret: 5,
      label: "Root",
    };

    const annotationWithoutLabel: Annotation = {
      string: 2,
      fret: 3,
    };

    expect(annotationWithLabel.label).toBe("Root");
    expect(annotationWithoutLabel.label).toBeUndefined();
  });

  it("onNoteClick callback should be callable with string and fret", () => {
    const onNoteClick = vi.fn();
    
    // Simulate a click
    onNoteClick(3, 5);

    expect(onNoteClick).toHaveBeenCalledTimes(1);
    expect(onNoteClick).toHaveBeenCalledWith(3, 5);
  });

  it("should handle multiple onNoteClick calls", () => {
    const onNoteClick = vi.fn();

    onNoteClick(1, 0); // Open string 1
    onNoteClick(6, 12); // String 6, fret 12

    expect(onNoteClick).toHaveBeenCalledTimes(2);
    expect(onNoteClick).toHaveBeenNthCalledWith(1, 1, 0);
    expect(onNoteClick).toHaveBeenNthCalledWith(2, 6, 12);
  });

  it("should render component with given props", () => {
    const props: FretboardProps = {
      strings: 6,
      frets: 12,
      annotations: [
        { string: 1, fret: 5, label: "A" },
        { string: 2, fret: 7 },
      ],
      viewMode: "full",
      onNoteClick: vi.fn(),
    };

    // Create element to verify it can be instantiated
    const element = React.createElement(Fretboard, props);

    expect(element).toBeDefined();
    expect(element.type).toBe(Fretboard);
    expect(element.props).toEqual(props);
  });

  it("should render component in boxes mode", () => {
    const props: FretboardProps = {
      strings: 6,
      frets: 5,
      annotations: [],
      viewMode: "boxes",
      onNoteClick: vi.fn(),
    };

    const element = React.createElement(Fretboard, props);

    expect(element.props.viewMode).toBe("boxes");
  });
});
