const express = require("express"),
	router = express.Router({ mergeParams: true });


router.get("*", (req, res)=>{
	console.log(`Request to ${req.path}`);
	res.status(404);


  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
})

module.exports = router;