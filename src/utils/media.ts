import _ from 'lodash';

// pause background videos
export const pauseOtherMedia = (currentMedia: HTMLMediaElement) => {
  const mediaElements = document.querySelectorAll<HTMLMediaElement>('video, audio');
  mediaElements.forEach((media) => {
    if (media !== currentMedia) {
      media.pause();
    }
  });
};

export async function computeSHA256(file: File) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function getTransformedFileName(fileName: string, userId: string) {
  console.log('generate file name function: ', fileName, userId);
  const nameWithoutExtension = fileName.split('.').map((c) => c.replace(/\s/g, ''));
  nameWithoutExtension.pop();
  const str = `${userId}_${Date.now()}_${_.kebabCase(nameWithoutExtension.join('').slice(-10))}`;
  return str;
}
