### README.md for the Custom Media Service

# Custom Media Service

This is a Node.js-based media management service that allows uploading, retrieving, updating, and deleting media files to/from AWS S3. The service is built without using Express and follows the requirements outlined in the task.

## Features

### 1. **Custom HTTP Server**

- Implements a basic HTTP server using the built-in `http` module.
- Routes API requests using a custom router.
- Supports the following HTTP methods:
  - `POST`: Upload media files
  - `GET`: Retrieve media files
  - `PUT`: Replace media files
  - `DELETE`: Remove media files from S3 storage.

### 2. **Media Operations**

- **Create**: Upload media files (JPEG, PNG, MP4) to AWS S3.
- **Read**: Retrieve media files from S3 using the unique key.
- **Update**: Replace existing media files in S3.
- **Delete**: Remove media files from S3 storage.

### 3. **AWS S3 Integration**

- Utilizes the AWS SDK to interact with S3.
- Efficiently handles file uploads, including large files (up to 15MB).
- Basic error handling for all operations (e.g., file size validation, type validation).

### 4. **File Validation**

- Validates the file type (JPEG, PNG, MP4).
- Validates the file size (up to 15MB).

### 5. **Logging**

- Logs incoming requests, successful operations, and errors.
- All logs are stored in the `/logs` directory.

## Technical Requirements

- **NodeJS**: The application is built using only native NodeJS modules and the AWS SDK.
- **No Express**: The application does not use Express for routing or handling requests.
- **Error Handling**: Includes error handling for common scenarios such as file validation (type, size) and AWS errors.
- **Logging**: Logs errors, requests, and successes into separate log files.

## Installation

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) version 14 or higher
- AWS credentials set up in your environment or via `.env` file.

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/custom-media-service.git
   cd custom-media-service
   ```

2. **Install Dependencies**

   Install the required Node.js dependencies:

   ```bash
   npm install
   ```

3. **Configure AWS Credentials**

   Create a `.env` file in the root of the project and add your AWS credentials:

   ```bash
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_REGION=your-region
   BUCKET_NAME=your-bucket-name
   ```

   **Note**: You can also set your AWS credentials via environment variables if you prefer.

4. **Run the Server**

   Start the server by running:

   ```bash
   node app.js
   ```

   The server will be available at `http://localhost:3000`.

## API Endpoints

### 1. **POST /upload**

Upload a media file to S3.

- **Request body**: Form-data with file key.
- **Response**: Returns success message with the uploaded file's name.

Example:

```bash
curl -X POST http://localhost:3000/upload -F "file=@path/to/your/file.jpg"
```

### 2. **GET /media/{fileKey}**

Retrieve a media file from S3 by its file key.

- **Response**: The media file is returned with the correct `Content-Type`.

Example:

```bash
curl http://localhost:3000/media/application-form/123/2025-03-25/1742932209849_string
```

### 3. **PUT /update/{fileKey}**

Replace an existing media file in S3.

- **Request body**: Form-data with the new file key.
- **Response**: Returns success message with the updated file's name.

Example:

```bash
curl -X PUT http://localhost:3000/update/application-form/123/2025-03-25/1742932209849_string -F "file=@path/to/your/new-file.jpg"
```

### 4. **DELETE /delete/{fileKey}**

Delete a media file from S3 by its file key.

- **Response**: Returns success message upon successful deletion.

Example:

```bash
curl -X DELETE http://localhost:3000/delete/application-form/123/2025-03-25/1742932209849_string
```

## Logging

- All incoming requests are logged in `logs/request.log`.
- Successful file operations are logged in `logs/success.log`.
- Errors are logged in `logs/error.log`.

## File Size and Type Restrictions

- **Maximum file size**: 15MB
- **Allowed file types**: JPEG, PNG, MP4

Files that exceed the size limit or have an unsupported type will return a `400` error with a descriptive message.

## Error Handling

The application handles the following errors:

- Invalid file type or size
- File upload errors
- AWS S3 operation failures
- Invalid URL format (e.g., when trying to fetch or delete a non-existent file)

### Example Error Response:

```json
{
  "statusCode": 400,
  "message": "Invalid file type. Only JPEG, PNG, and MP4 files are allowed."
}
```

## Conclusion

This service provides a robust solution for managing media files using AWS S3. It supports uploading, retrieving, updating, and deleting files, and includes built-in validation for file types and sizes. Additionally, it logs all actions and handles errors gracefully.
