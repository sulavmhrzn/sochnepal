from fastapi import FastAPI
from pydantic import BaseModel

from .toxicity_detector import detector

app = FastAPI()


class Content(BaseModel):
    id: int
    comment: str
    is_toxic: bool | None = False


@app.get("/")
async def index():
    return {"msg": "fastapi service"}


@app.post("/toxicity")
async def toxicity(contents: list[Content]):
    results = []
    for content in contents:
        res = detector.detect_toxicity(content.comment)
        content.is_toxic = bool(res[0])
        results.append(content)

    return {"results": results}
