# ci-cd

`ci-cd` is a web server created using [express.js](https://github.com/expressjs/express).

## What does it do?

I host most of my apps on a VPS. To manage them, I use a process manager called [pm2](https://github.com/unitech/pm2). 

As you imagine, manually updating the apps & then restarting them can become quite tedious.

This is where this project comes in. After receiving a request, it executes a series of pre-defined shell commands that handle the deployment for me.

## Wouldn't using a service like [Vercel](https://vercel.com) / [Netlify](https://netlify.com) be easier?

Probably, yes.

One could argue that it would even be cheaper, as those platforms offer serverless solutions.

However, as of right now, I don't think that I need them. I value the control that services such as [GCE](https://cloud.google.com/products/compute) give me.

Choosing the right PaaS is basically considering how much you're willing to pay for your convenience. I don't deny the fact that using Vercel would be a lot easier, I just don't consider depending on them necessary in my case.

## Entering the development environment

```shell
$ npm install
$ npm run build
$ npm run start
```

