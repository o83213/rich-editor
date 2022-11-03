export const scrollToElement = (targetId: string) => {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const rect = targetElement.getBoundingClientRect();
    window.scrollTo({
      behavior: "smooth",
      top: rect.top + window.scrollY - 100,
      left: 0,
    });
  }
};
