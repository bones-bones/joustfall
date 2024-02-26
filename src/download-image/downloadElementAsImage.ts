import "regenerator-runtime/runtime";

import html2canvas from "html2canvas";

export const downloadElementAsImage = async (
  element: HTMLElement,
  name: string
) => {
  const canvas = await html2canvas(element, {
    useCORS: true,
    backgroundColor: null,
  });
  const img = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = img;
  link.download = name + ".png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
