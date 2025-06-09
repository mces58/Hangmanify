import { execFileSync } from 'child_process';
import { lookup } from 'dns';

// check for internet connectivity before running expo-doctor.
lookup('expo.dev', (err) => {
  if (err) process.exit(0); // no internet: silently skip without error

  try {
    execFileSync('npx', ['expo-doctor@latest', '.'], { stdio: 'inherit' }); // nosonar
  } catch {
    process.exit(1);
  }
});
