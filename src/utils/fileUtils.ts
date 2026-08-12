import heic2any from 'heic2any';

export interface ProcessedImageResult {
  dataUrl: string;
  error?: string;
}

export function validateImageFile(file: File): string | null {
  if (!file) return 'Please select an image file.';

  const validTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/heic',
    'image/heif'
  ];

  const fileName = file.name.toLowerCase();
  const isHeic = fileName.endsWith('.heic') || fileName.endsWith('.heif');
  const isValidMime = validTypes.includes(file.type.toLowerCase());

  if (!isValidMime && !isHeic) {
    return 'Please upload a valid JPG, PNG, or HEIC image file.';
  }

  // Max size 25MB check
  if (file.size > 25 * 1024 * 1024) {
    return 'File size is too large. Please upload an image under 25MB.';
  }

  return null;
}

export async function processUploadedImage(file: File): Promise<ProcessedImageResult> {
  const validationError = validateImageFile(file);
  if (validationError) {
    return { dataUrl: '', error: validationError };
  }

  const fileName = file.name.toLowerCase();
  const isHeic = fileName.endsWith('.heic') || fileName.endsWith('.heif') || file.type.includes('heic') || file.type.includes('heif');

  try {
    let finalBlob: Blob = file;

    if (isHeic) {
      const conversionResult = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.92
      });

      if (Array.isArray(conversionResult)) {
        finalBlob = conversionResult[0];
      } else {
        finalBlob = conversionResult;
      }
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({ dataUrl: reader.result as string });
      };
      reader.onerror = () => {
        resolve({ dataUrl: '', error: 'Failed to read image file.' });
      };
      reader.readAsDataURL(finalBlob);
    });
  } catch (err) {
    console.error('HEIC/Image processing error:', err);
    return { dataUrl: '', error: 'Could not process HEIC photo. Try converting to JPG/PNG or selecting another photo.' };
  }
}
