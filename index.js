import express from "express";
import bodyParser from "body-parser";

const app = express();

const sleep = sec => {
  return new Promise(resolve=>setTimeout(resolve, sec*1e3));
};

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.set("port", 5000);

app.get("/", (request, response) => {
  console.log("Receive request to /");
  response.json(true);
});

app.post("/easom", (request, response) => {
  console.log("Received request to /easom");

  try {
    const x = request.body.ind;
    const a = Math.cos(x[0]);
    const b = Math.cos(x[1]);
    const c = Math.exp(-((x[0]-Math.PI)**2 + (x[1]-Math.PI)**2));
    response.json({res: a * b * c});
  }
  catch(e){
    response.json({res: -1e10});
  }
});

app.post("/sphere", (request, response) => {
  console.log("Received request to /sphere");

  try {
    const x = request.body.ind;
    const sum = x.reduce((acc,cur)=>acc+cur**2, 0);
    response.json({res: -sum});
  }
  catch(e){
    response.json({res: -1e10});
  }
});

app.listen(app.get("port"), () => {
  console.log(`Running at :${app.get("port")}`);
});
