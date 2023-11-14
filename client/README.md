### LMS CLIENT

## Setup instruction
1. Clone the project
```
git clone https://github.com/DEVnitishOfficial/LMS.git

```

2. move into the directory
```
cd client

```

3. install the dependencies
```
npm install

```

4. Run server
```
npm run dev

```

# TAILWIND SETUP INSTRUCTION

* From here setup your tailwind css configuration step by step

```
https://tailwindcss.com/docs/guides/vite

```
1. Install Tailwind CSS

```
npm install -D tailwindcss postcss autoprefixer

```
2. Create tailwind config file

```
npx tailwindcss init -p

```
3. Configure your template paths

```
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

```
4. Add the Tailwind directives to your CSS

```
@tailwind base;
@tailwind components;
@tailwind utilities;

```
5. Start your build process
```
npm run dev

```
### Adding plugins and dependencies
```
npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
```



