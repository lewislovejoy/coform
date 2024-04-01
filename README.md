![screenshot](Screenshot.png "Screenshot")

## Getting Started

Start the backend

`npm run dev`

Start the frontend

`npm run dev`

## Assumptions
In normal situations I'd just ask some clarifying questions before starting to reduce (or collaborate on assumtions),
but as this is a test I thought I'd just roll with it

1. I had 2 choice on what to create:

   a. A simple file uploader - just lets users upload up to 5 files at a time etc..

   b. A file manager - with file upload ability - that allows users to have a total of 5 files on the server at a time...

2. Although (a) was probably the required solution (as it was simpler), I chose to do (b) for a number of reasons - First, it includes (a) - so worst case it still fits the brief, second it's more complete (and easier to test) so shows off more code, and finally it's just more interesting. 
3. Files are added separately and then all uploaded when the button is pressed
4. It upload one file at a time
5. Each file has a 6sec timeout (set on axios)
6. We don't care if it is exact copy of the figma (i.e. fonts, colors, padding don't nee to be exact)
7. Speed over quality - a lot of features for 2hrs - so no tests or refactoring for good structure (and some features missing)
8. The spec doesn't say how to show errors to users - so I've used a 3rd party toaster
9. Not sure what to persist in the db - so I've just added filename, userid and s3 location

## Limitations
All these limitations are caused by the time constraint...

1. I've not researched better ways to upload/store files - just used the obvious way (which may not be good for large files etc..)
2. Lots of nasty hard coding (including in css)
3. No error checking server side - and little client side - so lots of edge cases are not covered (e.g. You can upload the same file more than once, or 2 files with the same filename etc.)
4. I've used rubbish icons in many places - ideally I would use an icon library and logos instead (i.e Radix Icons don't include PDF or TXT images, or a Spinner of the correct style, etc..)
5. No automated tests - I've just run some manual ones (and not many of those either)
6. Not built for multi-lingual etc..

