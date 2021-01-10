**FULLSTACK NUXT + EXPRESS + MONGODB**

## Build Setup

Для запуска приложение требуется привязать базу mongodb
<p>  https://www.mongodb.com/  </p>
<p> после регистрации на сайте, создайте базу данных </p>
Дождитесь когда она активируется 
<p>нажмите кнопку connect, создайте админа данные могут быть любые, они нам понадобятся, привяжите свой IP </p>
<p>Выберите Connect your application</p>
привяжите бд к приложению указав ссылку вида
<p> ( mongodb+srv:// &#60;username	&#62; : &#60;password	&#62;@cluster0.mwphw.mongodb.net/<dbname>?retryWrites=true&w=majority ) </p>
<p> вставив её в файл keys.dev.js  </p>
<p>  либо  </p>
<p>  поместитите в специальную переменную env.MONGO_URL  </p>

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
