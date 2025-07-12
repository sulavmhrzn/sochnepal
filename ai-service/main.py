from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .toxicity_detector import detector

app = FastAPI()

# origins = ["http://localhost:8000", "http://localhost"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Comment(BaseModel):
    id: int
    comment: str


class CommentOut(Comment):
    confidence: float
    is_toxic: bool | None = False


@app.get("/")
async def index():
    return {"msg": "fastapi service"}


@app.post("/predict-toxicity")
async def predict_toxicity(comments: list[Comment]):
    results = []
    for comment in comments:
        is_toxic, final_score, _ = detector.detect_toxicity(comment.comment)
        results.append(
            CommentOut(
                id=comment.id,
                comment=comment.comment,
                confidence=final_score,
                is_toxic=bool(is_toxic),
            )
        )

    return {"results": results}
