// Global function to show custom toast notification
let currentToastInstance = null;

export const showCustomAlert = (message, type = 'info', duration = 3000) => {
  const container = document.getElementById('toast-container');
  if (!container) {
    console.error("Toast container not found. Using browser alert fallback.");
    alert(message);
    return;
  }

  const toastId = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  let bgColorClass = 'bg-blue-800'; // Default info
  let textColorClass = 'text-white';
  let iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;

  if (type === 'success') {
    bgColorClass = 'bg-green-600';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-8.5"/><path d="m11 12 2 2 4-4"/></svg>`;
  } else if (type === 'error') {
    bgColorClass = 'bg-red-600';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-x-circle"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`;
  } else if (type === 'warning') {
    bgColorClass = 'bg-yellow-600';
    textColorClass = 'text-gray-900'; // Darker text for yellow background
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-alert-triangle"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
  }

  const toastHtml = `
    <div id="${toastId}" class="toast-item ${bgColorClass} ${textColorClass} p-4 rounded-lg shadow-lg mb-3 flex items-center space-x-3 opacity-0 transform translate-y-full transition-all duration-300 ease-out">
      ${iconSvg}
      <span>${message}</span>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', toastHtml);
  const newToast = document.getElementById(toastId);

  // Animate in
  setTimeout(() => {
    if (newToast) {
      newToast.style.opacity = '1';
      newToast.style.transform = 'translateY(0)';
    }
  }, 50);

  // Animate out and remove
  setTimeout(() => {
    if (newToast) {
      newToast.style.opacity = '0';
      newToast.style.transform = 'translateY(-20px)';
      newToast.addEventListener('transitionend', () => {
        newToast.remove();
      });
    }
  }, duration);
};