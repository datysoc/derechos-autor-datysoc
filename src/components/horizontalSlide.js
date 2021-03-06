import {cubicOut} from 'svelte/easing';

export const horizontalSlide = (node, {
  delay = 0,
  duration = 400,
  easing = cubicOut
}) => {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const width = parseFloat(style.width);

  return {
    delay,
    duration,
    easing,
    css: t => {
      const translateX = 400 - (t * width);

      return `
        transform: translateX(${translateX}px);
        opacity: ${Math.min(t * 60, 1) * opacity}; +
      `
    }
  };
}
