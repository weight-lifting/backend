# Weight Lifting Journal

## API Endpoints

### Auth Endpoints

| **Method** | **Endpoint** | **Description**                                                                                                                                           |
| ---------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST       | /register    | Creates a `user` sent inside the `body` of the request. **Hashes** password before saving onto the database.                                              |
| POST       | /login       | Uses the credentials sent inside the `body` to authenticate the user. On successful login, creates a JWT token to be used to access restricted endpoints. |

### Exercise

| **Method** | **Endpoint**   | **Description**                                                            |
| ---------- | -------------- | -------------------------------------------------------------------------- |
| GET        | /exercises     | Retrieves a list of all `exercises` for the specific user in the database. |
| GET        | /exercises/:id | Retrieves an `exercise` specified by the `id` provided for a specific user |
| POST       | /exercises     | If all required fields are met, creates an `exercise` for a specific user. |
| DELETE     | /exercises/:id | Deletes the `exercise` with the specified `id` for a specific user.        |
| PUT        | /exercises/:id | Updates the `exercise` with the specified `id` for a specific user.        |
