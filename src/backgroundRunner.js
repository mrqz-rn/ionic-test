// src/backgroundRunner.js

import { BackgroundRunner } from '@capacitor/background-runner';


// Define the background task function
const backgroundTask = async () => {
  console.log('Background task running...');

  // Example background logic
  let counter = 0;
  const interval = setInterval(() => {
    console.log(`Background task tick: ${counter++}`);
  }, 1000);

  // If you need the task to stop at some point
  setTimeout(() => {
    clearInterval(interval);
    console.log('Background task finished');
  }, 10000); // Task runs for 10 seconds

  return Promise.resolve();
};

// Register the background task
export const startBackgroundTask = async () => {
  try {
    await BackgroundRunner.start({
      taskName: 'MyBackgroundTask',
      taskFn: backgroundTask,
    });
    console.log('Background task started');
  } catch (err) {
    console.error('Failed to start background task:', err);
  }
};

// Stop the background task
export const stopBackgroundTask = async () => {
  try {
    await BackgroundRunner.stop({
      taskName: 'MyBackgroundTask',
    });
    console.log('Background task stopped');
  } catch (err) {
    console.error('Failed to stop background task:', err);
  }
};
