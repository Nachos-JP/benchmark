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
  response.json("Running benchmark");
});

app.post("/easom", async (request, response) => {
  const x = request.body;
  const a = Math.cos(x[0]);
  const b = Math.cos(x[1]);
  const c = Math.exp(-((x[0]-Math.PI)**2 + (x[1]-Math.PI)**2));
  await sleep(0.5);
  response.json(a * b * c);
});

app.listen(app.get("port"), () => {
  console.log(`Running at :${app.get("port")}`);
});
