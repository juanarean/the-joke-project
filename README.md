# Joke Project Exercise

## Description

This project is a monorepo containing a Back-end that serves a list of jokes and a Front-end that displays them. The Front-end presents the jokes as a list with pagination, you can sort the jokes by ID, type of joke and the setup property which is the first part of the joke, if you want to know how the joke ends, the punchline, you need to expand the joke's row, that builds the expectation.

[Screencast from 2025-04-23 10-22-44.webm](https://github.com/user-attachments/assets/08232e4e-cebf-4dbc-a157-4543fa34ea74)

To test the project in local, clone the repository and cd into project's folder.
Then, to install all dependencies needed run in the terminal:
```shell
npm run install:all
```

And to run the proyect:
```shell
npm run start
```

To access the Front-end open your browser at [http://localhost:5173/](http://localhost:5173/) the Back-end serves at localhos:3005.

## My Journey
After reading the exercise, my first decision was to go on with the suggested API back-end project and add the modifications I needed.
For the Front-end I was a bit doubtful if resolve it in a Vue.js app or a Nuxt app. I was familiar with Vue docs but not with Nuxt, so I read some of it.
I found that the preferred UI library for Nuxt is NuxtUI that it's installable from the creation of the project, it can also be used for Vue projects.
For Vue there are a couple of options for UI components library recommended [here](https://ui-libs.vercel.app/), I choose [primevue](https://primevue.org/), firstly because it has the components I needed and secondly I liked the default theming.

> *Initially I created both front-end projects, Vue and Nuxt, but I couldn't find time to work on both, so I end up deleting the Nuxt app. You can check that in the commit history.*

**IMPORTANT**

Regarding the decision on handling pagination, sorting and filtering on the back-end, I think is the correct approach in my experience. Another way could have been to retrieve all jokes from the Back-end onMount and the let the `DataTable` component handle everything. But often in a real-life project the data is huge or it has to be processed in some form and it's not good idea for performance to load the Front-end with all that data.

## Code Explanation

### Root project
In the root folder of this project you'll see a package.json that installs a node utility package called [pm2](https://www.npmjs.com/package/pm2). I use this to handle several process when I need to serve more than one project like the two we have here, the Back-end and the Front-end.
For pm2 to execute all the process they have to be defined in the [ecosystem.config.js](https://github.com/juanarean/the-joke-project/blob/main/ecosystem.config.js)
So with `pm2 start` all processes start running and with `pm2 delete all` all the processes stop and clear cache.
It's just an easy way to start everything with one command.

### Back-end
As I sayd before I used the recomended API prooject for the exercise and add then endpoint I needed:
```js
app.post('/jokes/query', (req, res) => {
  const { page, pageSize, query, sorting } = req.body;
  const pageValue = parseInt(page, 10)
  const pageSizeValue = parseInt(pageSize, 10)
  res.json(
    jokesPage(pageValue, pageSizeValue, query.toLowerCase(), sorting)
  )
})
```

Also needed to add configuration to the express server to handle POST body data:
```js
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
```

And the corresponding data handler:
```js
const jokesPage = (page, pageSize, query, sorting) => {
  const [key, order] = sorting.split(':');
  const offset = page * pageSize;

  const sortAlphaticaly = (a, b, order) => {
    if (order === 'desc') {
      if (a > b) {
        return -1
      }
      if (a < b) {
        return 1
      }
      return 0
    } else {
      if (a > b) {
        return 1
      }
      if (a < b) {
        return -1
      }
      return 0
    }
  }

  const filteredJokes = jokes
    .sort((a, b) => {
      if (typeof a[key] === 'number') {
        if (order === 'desc') {
          return b[key] - a[key]
        }
        return a[key] - b[key]
      }
      return sortAlphaticaly(a[key], b[key], order)
    })
    .filter(joke => !query || joke.setup.toLowerCase().includes(query) || joke.type.toLowerCase().includes(query))

  return {
    jokes: filteredJokes.slice(offset, offset + pageSize),
    total: filteredJokes.length
  }
}
```

### Front-end
Given it's a simple example I decided to use just the App.vue component and I created a [service](https://github.com/juanarean/the-joke-project/blob/main/front-end/vue-app/src/services/service.ts) to handle the data fetching so the App component is a bit cleaner and it only cares about components behaviour.

>I always try to work with Typescript if posible, I prefer to have all the data typed and checked.

I had some minor issue to handle custom sorting with the `DataTable` from the primevue library but I just needed to dig deeper on the docs to find the [DataTableSortEvent](https://primevue.org/datatable/#api.datatable.events.DataTableSortEvent), after that the rest was ppretty straight forward.
Theres is way to auto import all the primevue components and then the treeshake disposes the unused ones but I only use a few so I imported manually in the [main.ts](https://github.com/juanarean/the-joke-project/blob/main/front-end/vue-app/src/main.ts).

## Things To Improve
> A list of things that I would like to add with more time.

* Add a select to filter by joke type, change the response to give the available types and fill a dropdown with them, when user selects one filter by that type.
* Add some animation when open a punchline.
* Improve on theming. I have some UX concepts but I feel I lack in style (I don't even dress cool :\ ).
* Add a loading while fetching data. Didn't notice I need one but I think it's necessary
