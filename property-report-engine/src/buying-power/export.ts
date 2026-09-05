export type PrintFormat = "8x10" | "letter";

export function printReport(format: PrintFormat) {
  const style = document.createElement("style");
  style.dataset.exportPageSize = format;
  style.textContent = `@page{size:${format === "8x10" ? "8in 10in" : "letter portrait"};margin:.22in}`;
  document.head.appendChild(style);
  const cleanup = () => { style.remove(); window.removeEventListener("afterprint", cleanup); };
  window.addEventListener("afterprint", cleanup);
  window.print();
}

function inlineComputedStyles(source: Element, target: Element) {
  const styles = getComputedStyle(source);
  target.setAttribute("style", Array.from(styles).map((name) => `${name}:${styles.getPropertyValue(name)};`).join(""));
  Array.from(source.children).forEach((child, index) => inlineComputedStyles(child, target.children[index]));
}

export async function exportReportPng(report: HTMLElement, filename: string) {
  const clone = report.cloneNode(true) as HTMLElement;
  clone.classList.add("report-format-8x10", "png-render");
  clone.style.cssText += "position:fixed;left:-10000px;top:0;width:768px;height:960px;margin:0;box-shadow:none;";
  document.body.appendChild(clone); inlineComputedStyles(clone, clone); clone.remove();
  clone.style.position = "static"; clone.style.left = "auto"; clone.style.top = "auto";
  const xml = new XMLSerializer().serializeToString(clone);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="3000" viewBox="0 0 768 960"><foreignObject width="768" height="960"><div xmlns="http://www.w3.org/1999/xhtml">${xml}</div></foreignObject></svg>`;
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  try {
    const image = new Image(); image.decoding = "sync";
    await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error("Unable to render the report image.")); image.src = url; });
    const canvas = document.createElement("canvas"); canvas.width = 2400; canvas.height = 3000;
    const context = canvas.getContext("2d"); if (!context) throw new Error("Canvas rendering is unavailable.");
    context.fillStyle = "#ffffff"; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(image, 0, 0, 2400, 3000);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error("PNG encoding failed.")), "image/png"));
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = filename; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  } finally { URL.revokeObjectURL(url); }
}
