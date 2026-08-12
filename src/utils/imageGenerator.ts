import { toPng } from 'html-to-image';

export async function exportCardAsPng(node: HTMLElement, fileName: string, scaleFactor: number = 2): Promise<boolean> {
  try {
    const images = Array.from(node.querySelectorAll('img'));
    await Promise.all(
      images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    const dataUrl = await toPng(node, {
      quality: 0.98,
      pixelRatio: scaleFactor,
      cacheBust: true,
      backgroundColor: '#05131A'
    });

    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error('Failed to export card image:', error);
    return false;
  }
}

export async function getCardDataUrl(node: HTMLElement): Promise<string | null> {
  try {
    return await toPng(node, {
      quality: 0.95,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: '#05131A'
    });
  } catch (error) {
    console.error('Failed to get card data URL:', error);
    return null;
  }
}
