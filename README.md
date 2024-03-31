This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Start the backend

`npm run dev`

Start the frontend

`npm run dev`


## Assumptions
1. Files are added seperatly and then all uploaded when the button is pressed
2. Upload one file at a time
3. Each file has a 6sec timeout (set on axios)
4. We don't care if it is exact copy of the figma (i.e. fonts, colors, padding don't nee to be exact)
5. Speed over quality - a lot of features for 2hrs - so no tests or refactoring for good structure
6. The spec doesn;t say how to show errors to users - so I've left this off the solution for now (mainly due to 5 above)

## Limitations
1. I've not limited the number of uploads or the file types - but this is fairly easy given the solution
2. I've not researched better ways to upload/store files - just used the obvious way (which may not be good for large files etc..)
2. Lots of nasty hard coding (including in css)
3. No error checking server side - and little client side - so lots of edge cases are not covered
4. I've used the same icon in many places - ideally would use an icon library and logos instead
5. No automated tests - I've just run some manual ones

