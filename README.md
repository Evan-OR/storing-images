# Storing Images :camera_flash:

This project aims to test storing and retrieving images in MySQL.

# What was Learned :mortar_board:

### Image Storage Fundamental & Best Practices :closed_book:

To store images, the process involved converting the frontend image into a formData object, which was then base64 encoded before being stored as MySQL TEXT. On the other hand, to retrieve images, the MySQL TEXT data was base64 decoded and then rendered as an image in the frontend.

### Downscaled Images & UX :slightly_smiling_face:

Requesting large images even when the high image quality is not necessary can create extremely long network requests, which can lead to poor user experience. To address this, it's recommended to have smaller images that can be used as thumbnails or when an image is not the main focus of a page.

One approach is to create downscaled versions of each image upon upload, trading off database storage space for better user experience.

For creating downscaled image variations I used the npm package **[sharp](https://www.npmjs.com/package/sharp)**.

### Scaling Issues :moneybag::fire:

If your application deals with a large number of images, storing them directly in a database may not be the best solution. This is because database storage can quickly become expensive and inflate the storage requirements.

Instead, it would be more practical to use a cloud storage solution such as [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs#:~:text=Azure%20Blob%20Storage%20helps%20you,computing%20and%20machine%20learning%20workloads.) to store your images, while saving the image URI in the database instead of the image itself. This approach allows you to efficiently manage and scale your image storage needs without incurring the high cost of database storage.
