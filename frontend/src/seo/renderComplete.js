export function markRenderComplete() {
  if (typeof document === 'undefined') return;
  document.dispatchEvent(new Event('render-complete'));
}

