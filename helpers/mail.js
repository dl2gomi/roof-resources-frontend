export const openMailWindow = (body) => {
  const recipient = '';
  const subject = encodeURIComponent('Your Custom Roofing Quote – Ready for Review & Purchase');

  const popupWidth = 600;
  const popupHeight = 600;
  const left = (window.screen.width - popupWidth) / 2;
  const top = (window.screen.height - popupHeight) / 2;

  // Open Gmail compose window
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${encodeURIComponent(body)}`,
    'gmailPopup',
    `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes`,
  );
};
