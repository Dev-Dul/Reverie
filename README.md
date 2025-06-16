# ReverieEngine

The Odin Project's Blog API Project.

## Details

This project is part of the Odin Project's Curriculum. It is meant for learners to practice what they've learnt in the API Basics Module (Under the NodeJS course) by building a jamstack based Blog app that decouples the frontend and backend into seperate parts, with the backend being an Express API which uses JWT to protect sensitive routes. This project is the Backend API which implements authentication using passport.js(jwt), as well as uses other tools including Cors(to enable cross-origin access),  Express, Express-Validator, Postgres, and bcrypt among others. Areas of practice include jsonwebtokens(JWT), authentication, routing, API response, validation, postgres set-up and manipulation techniques, e.t.c.

## Features
   Features of ReverieEngine include:

   * Routing - The ReverieEngine Provides Access to numerous endpoints.

   * Security - The API uses JWT to secure protected routes. These routes (endpoints) can only be accessed by users with valid access tokens.

   * Clear API Responses: The API provides clear non-ambiguous responses to users whether in cases  of success or failure.

   * Data persistence: The app uses postgres to store and retrieve data.

   * ORM based: The app uses Prisma ORM to interface with and manipulate the postgres db instead of using raw SQL.

   * The API features all CRUD functionality for the Posts as well as the comments within them.

## Protected Routes
    
   * /api/v1/blog/:postId/edit - For editing posts.

   * /api/v1/blog/:postId/delete - For deleting posts.

   * /api/v1/blog/:postId/comments/:commentId/edit - For Editing comments.

   * /api/v1/blog/:postId/comments/:commentId/delete - For Deleting Comments.

## Unprotected Routes.

   *  /api/v1/blog/ - For fetching all blog posts.

   * /api/v1/blog/:postId - For fetching a specific blog post by Id.

   * /api/v1/blog/create - For creating a blog post.

   * /api/v1/blog/:postId/publish - For publishing a blog post.

   * /api/v1/blog/:postId/comments/create - For creating a comment under a blog post.

   
 
  
   