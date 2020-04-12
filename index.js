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

app.post("/eggholder", (request, response) => {
  console.log("Received request to /eggholder");

  try {
    const x1 = parseFloat(request.body.ind[0]);
    const x2 = parseFloat(request.body.ind[1]);
    const cal1 = -(x2+47)*Math.sin(Math.sqrt(Math.abs(x2+(x1/2)+47)));
    const cal2 = -x1*Math.sin(Math.sqrt(Math.abs(x1-(x2+47))));
    response.json({res: -(cal1+cal2)});
  }
  catch(e){
    response.json({res: -1e10});
  }
});

app.listen(app.get("port"), () => {
  console.log(`Running at :${app.get("port")}`);
});
