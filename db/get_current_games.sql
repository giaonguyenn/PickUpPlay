SELECT games.*, users.username 
FROM games JOIN users 
ON games.uid = users.uid 
WHERE courtid = $1
ORDER BY time ASC;