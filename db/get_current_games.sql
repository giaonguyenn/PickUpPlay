SELECT * FROM games 
WHERE courtid = $1
ORDER BY time ASC;