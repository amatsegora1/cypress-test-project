FROM cypress/included:10.11.0

RUN apt-get update && apt-get install -y firefox-esr

WORKDIR /e2e

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

CMD ["npx", "cypress", "run", "--browser", "firefox"]