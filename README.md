# Storing Images

This project aims to test storing and retrieving images in MySQL.

# What was Learned

#### Image Storage Fundamental & Best Practices

To store images, the process involved converting the frontend image into a formData object, which was then base64 encoded before being stored as MySQL TEXT. On the other hand, to retrieve images, the MySQL TEXT data was base64 decoded and then rendered as an image in the frontend.

#### Storing Smaller Image Versions

Requesting large images even when the high image quality is not necessary can create extremely long network requests, which can lead to poor user experience. To address this, it's recommended to have smaller images that can be used as thumbnails or when an image is not the main focus of a page.

One approach is to create downscaled versions of each image upon upload, trading off database storage space for better user experience. <br/> For creating downscaled image variations I used the npm package **[sharp](https://www.npmjs.com/package/sharp)**.
