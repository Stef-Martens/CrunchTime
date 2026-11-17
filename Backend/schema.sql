CREATE TABLE IF NOT EXISTS user (
  user_id    INT AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(255) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name  VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS refresh_token (
  user_id       INT NOT NULL,
  refresh_token VARCHAR(512) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);
