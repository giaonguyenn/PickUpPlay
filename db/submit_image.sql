UPDATE users
SET image = $1
WHERE uid = $2;

SELECT image
FROM users
WHERE uid = $2;