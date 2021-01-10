**FULLSTACK NUXT + EXPRESS + MONGODB**

## Build Setup

Для запуска приложение требуется привязать базу mongodb
https://www.mongodb.com/
после регистрации на сайте создайте базу данных и привяжите её к приложению указав ссылку вида
( mongodb+srv://<username>:<password >@cluster0.mwphw.mongodb.net/popso?retryWrites=true&w=majority )
и вставьте в файле keys.dev.js
либо
поместитите в специальную переменную env.MONGO_URL

![popso](./assets/images/README.md/screen1.jpg)

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
