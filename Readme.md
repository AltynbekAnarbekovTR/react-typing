# React typing app

<p float="left">
  <img src="https://github.com/AnarbekovAlt/react-typing/assets/62358513/c7eacafa-9beb-436e-9b2a-279fcb83e093" width="400" height="175"/>
  <img src="https://github.com/AnarbekovAlt/react-typing/assets/62358513/5ddb7a26-1a57-4202-8205-833358168392" width="400" height="175"/>
</p>

**Warning: Bacon Ipsum API may not work correctly in Russia. If the words are not displayed, make sure you have VPN enabled, or use Russian words option.**

A react application to practice your typing skills. The app was built using:

- Vite
- Typescript
- React
- Redux Toolkit
- React Bootstrap
- Bacon Ipsum API (for English text) and FishText API (for Russian text)

## App features

At the start of the app you can:

- select the language of the text you want to type.
- select text size

While typing:

- if you type the correct key, the character will be green, if you make a mistake, it will be highlighted in red.
- if you typed a key with the wrong keyboard layout (keyboard language), the corresponding message will be shown.
- displays the elapsed time, the number of errors, the total number of characters typed, typing speed, accuracy.
- you can click the "Reset" button to reset the text and text options

After completing typing:

- a modal window is displayed with your results and a reset button

## How to run

```bash
npm i
npm run dev
```
