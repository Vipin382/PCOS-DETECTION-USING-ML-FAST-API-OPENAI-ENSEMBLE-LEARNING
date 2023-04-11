from typing import Union

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle


model = pickle.load(open('final_model.pkl', 'rb'))
app = FastAPI()

origins = [
    "*"
]


class Item(BaseModel):
    age: int
    weight: float
    height: float
    cycle: float
    food: int


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():

    return {"Hello": "World"}


@app.post("/pcos")
async def read_item(item: Item):
    final_features = [[item.age, item.weight, item.height, 15, 78, 22, 10.48, 2, item.cycle, 7, 0, 0, 3.68, 2.160326087,
                       36, 30, 0.68, 2.07, 45.16, 17.1, 0.57, 92, 0, 0, 0, 0, item.food, 1, 0, 110, 80, 3, 3, 18, 18, 8.5, 0]]
    prediction = model.predict(final_features)
    print()
    return {"result": bool(prediction[0])}
