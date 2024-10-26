// vetur.config.js
module.exports = {
    // Specify the root of your Vue app (or monorepo if applicable)
    projects: [
      {
        root: './', // The root of your project
        tsconfig: './tsconfig.app.json', // Point to your tsconfig.app.json
        package: './package.json', // Optional
        globalComponents: ['./src/components/**/*.vue'], // Optional
      },
    ],
  };
  