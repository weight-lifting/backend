# Weight Lifting Journal

https://weight-lift-1.herokuapp.com/api/

## API Endpoints

### Auth Endpoints

https://weight-lift-1.herokuapp.com/api/auth

| **Method** | **Endpoint** | **Description**                                                                                                                                           |
| ---------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST       | /register    | Creates a `user` sent inside the `body` of the request. **Hashes** password before saving onto the database.                                              |
| POST       | /login       | Uses the credentials sent inside the `body` to authenticate the user. On successful login, creates a JWT token to be used to access restricted endpoints. |

### Exercise

https://weight-lift-1.herokuapp.com/api/

| **Method** | **Endpoint**   | **Description**                                                            |
| ---------- | -------------- | -------------------------------------------------------------------------- |
| GET        | /exercises     | Retrieves a list of all `exercises` for the specific user in the database. |
| GET        | /exercises/:id | Retrieves an `exercise` specified by the `id` provided for a specific user |
| POST       | /exercises     | If all required fields are met, creates an `exercise` for a specific user. |
| DELETE     | /exercises/:id | Deletes the `exercise` with the specified `id` for a specific user.        |
| PUT        | /exercises/:id | Updates the `exercise` with the specified `id` for a specific user.        |

## Data Models

### Exercise Data Model

| **Field**             | **Type** | **Description**                                    |
| --------------------- | -------- | -------------------------------------------------- |
| id                    | Integer  | ID of the newly created exercise                   |
| title                 | String   | Title of the newly created exercise                |
| targeted area         | String   | Body part targeted for the newly created exercise  |
| repetitions completed | Integer  | Number of reps of the newly created exercise       |
| date                  | Integer  | Date of newly created exercise                     |
| user id               | Integer  | User ID that the newly created exercise belongs to |

### User Data Model

| Field    | Type       | Description                          |
| -------- | ---------- | ------------------------------------ |
| username | String     | A unique username chosen by the user |
| password | top secret | top secret                           |
