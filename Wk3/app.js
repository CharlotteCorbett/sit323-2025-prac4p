
// Requiring express, which runs as our server.
const express= require("express");

// Initiates our app and calls express.
const app= express();

const fs = require('fs');

// Requiring winston, which runs as our logger.
const winston = require('winston');

// Create logger using npm winston logger libray
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'add-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  // Create constant that adds number 1 and number 2
const add= (n1,n2) => {
    return n1+n2;
}
  // Create constant that subtracts number 1 and number 2
const subtract= (n1,n2) => {
    return n1-n2;
}

  // Create constant that multiples number 1 and number 2
const multiply= (n1,n2) => {
    return n1*n2;
}

  // Create constant that adds number 1 and number 2
const divide= (n1,n2) => {
  return n1/n2;
}

// Adds number 1 and number 2 if the input is correct (eg: n1 and n2 are numbers such as '4', not 'a' or '/', etc)
app.get("/add", (req,res)=>{
    try{
      // convert input from string to number
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    // Customise a specific error case for n1 and n2  
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    
    // If number1 or number2 is not a number, log and throw parsing error
    if (n1 === NaN || n2 === NaN) {
        console.log()
        throw new Error("Parsing Error");
    }

    // Leave a log reporting that n1 and n2 have been received for the addition service
    logger.info('Parameters '+n1+' and '+n2+' received for addition');
    const result = add(n1,n2);

      // Return status code of http request and result
    res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscode:500, msg: error.toString() })
      }
});

// Subtracts number 1 and number 2 (number1-number2) if the input is correct (eg: n1 and n2 are numbers such as '4', not 'a' or '/', etc)
app.get("/subtract", (req,res)=>{
  try{
    // convert input from string to number
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  // Customise a specific error case for n1 and n2  
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  // If number1 or number2 is not a number, log and throw parsing error
  if (n1 === NaN || n2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }

  // Leave a log reporting that n1 and n2 have been received for the subtraction service
  logger.info('Parameters '+n1+' and '+n2+' received for subtraction');
  const result = subtract(n1,n2);

  // Return status code of http request and result
  res.status(200).json({statuscode:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscode:500, msg: error.toString() })
    }
});

// Mulltiplies number 1 and number 2 if the input is correct (eg: n1 and n2 are numbers such as '4', not 'a' or '/', etc)
app.get("/multiply", (req,res)=>{
  try{
    // convert input from string to number
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);

  // Customise a specific error case for n1 and n2  
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }

  // If number1 or number2 is not a number, log and throw parsing error
  if (n1 === NaN || n2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }

  // Leave a log reporting that n1 and n2 have been received for the multiplication service
  logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
  const result = multiply(n1,n2);

    // Return status code of http request and result
  res.status(200).json({statuscode:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscode:500, msg: error.toString() })
    }
});

// Performs division with number 1 and number 2 (number1/number2) if the input is correct (eg: n1 and n2 are numbers such as '4', not 'a' or '/', etc)

app.get("/divide", (req,res)=>{
  try{
    // convert input from string to number
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);

  // Customise a specific error case for n1 and n2  
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  // If number1 or number2 is not a number, log and throw parsing error
  if (n1 === NaN || n2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }

  // Check if the denominator (n1) is 0, and if it is, throw a divide by zero error
  if (n1 === 0) {
    console.log()
    throw new Error("Cannot divide by zero!")
  }

  // Leave a log reporting that n1 and n2 have been received for the division service
  logger.info('Parameters '+n1+' and '+n2+' received for division');
  const result = divide(n1,n2);

  // Return status code of http request and result
  res.status(200).json({statuscode:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscode:500, msg: error.toString() })
    }
});



// Initiates our port constant, which can be changed here
const port=3040;

// Tells app to listen to our port variable as well as details where to see the query results
app.listen(port,()=> {
    console.log("hello i'm listening to port " +port);
    console.log("You can see my results on Postman or at http://localhost:" + port)
})