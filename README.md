# Stotles work sample assignment

## Getting started

This sample codebase consists of a separate client & server code.

It's set up in a simple way to make it as easy as possible to start making changes,
the only requirement is having recent versions of `node` & `npm` installed.

This is not a production ready configuration (nor production ready code),
it's only set up for easy development, including live reload.

To run the client bundler:

```
cd client
npm install
npm run dev
```

The processed code will be available at http://localhost:3001

To start the server:

```
cd server
npm install
npm run dev
```

The server will be available at http://localhost:3000 - the page is automatically configured
to use the assets served by vite on port 3001.

You should see something similar to this page:

![Search page](./screenshot.png)

### Disabling/Enabling TypeScript

If you prefer to completely disable TypeScript for a file, add `// @ts-nocheck` on the first line.
If on the other hand you'd like to enable strict type checking, modify `tsconfig.json` according to your needs.

Note that you can import plain JavaScript files that won't be fully typechecked.

### Browsing the database

You should start by looking at the migration in `./migrations` folder.
If you prefer to browse the DB using SQL, you can use the sqlite command line (just run `sqlite3 ./db.sqlite3`)
or any other SQL client that supports sqlite.

If for any reason the database becomes unusable, you can rebuild it using `./reset_db.sh` script`.

## The task

All the instructions are available [here](https://www.notion.so/stotles/Full-stack-software-engineer-work-sample-assignment-ae7c64e08f2a42a097d16cee4bc661fc).

# Notes

Below I have outlined some thoughts about areas that I would start to look at next and reflections about what I would differently given the same task again.

1. Test Driven Development.
As you can see, I have not written any tests in this initial implementation. I made this decision to try and stick as close to the 3 hour guideline as 
possible, however normally I would do TDD. If I were to do this exercise again, I would at least implement some basic unit tests in a TDD manner as this
would have given me more confidence in my code and made debugging much easier! Given more time, I would also look to implement some E2E tests. I would 
also like to include unit tests in a precommit so that I know all code has been tested before it's been committed.

2. Dependencies
I updated the dependencies using `npm audit fix` and then did some manual testing to make sure everything still worked. If this were a genuine project,
I would have updated the `package.json` file and pinned the latest version of the updated dependencies that I had tested and verified would work. 

3. `searchRecords()`
The `searchRecords` function in `/server/main.ts` is crudely written and not maintainable at scale so I would look to refactor this.

4. Filtering by multiple buyers
I have setup the backend so that it is possible to filter by multiple buyers. To make this possible in the front end, I need to add `mode="multiple"`
to my `select` component. When I manually tested this functionality it worked, however when you cleared the selected buyers, the table didn't return
any data. I didn't think this was desired functionality so removed it, but would like to investigate this further as I believe filtering by multiple
buyers would provide an improved user experience.

5. Blank page bug
I found that when clicking the  'Load more' button multiple times, or typing 4 characters in the 'search text' box (on initial loading of the page), the app
would only display a blank page. I would like to look into what is causing this behaviour and find a solution.