## Code review summary

1. One of the first things that caught my attention was the lack of loading.tsx components, but after further review i see that the developer does a great use of Static Server Rendering so since html is mostly build at build time, no need for loading is supported.
   2.- Most the code seams very well done, structure and documented, is really a well done app
   3.- My improvements findings have been mostly around:
   a. Better error handling
   b. Validating environment variables
   c. Sanitation of dynamic html
   4.- Only one bug found: a wrong double negation on /Components/Comments.tsx line 13
