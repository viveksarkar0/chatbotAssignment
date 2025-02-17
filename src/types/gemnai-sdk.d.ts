declare module 'gemnai-sdk' {
  // Add any specific types or interfaces you need
  export const gemnaiClient: {
    chat: (options: { prompt: string }) => Promise<{ data: string }>;
  };
} 