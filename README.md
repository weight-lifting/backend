# Weight Lifting Journal

## API Endpoints

### Auth Endpoints

| **Method** | **Endpoint** | **Description**                                                                                                                                           |
| ---------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| POST       | /register    | Creates a `user` sent inside the `body` of the request. **Hashes** password before saving onto the database.                                              |
| POST       | /login       | Uses the credentials sent inside the `body` to authenticate the user. On successful login, creates a JWT token to be used to access restricted endpoints. |
