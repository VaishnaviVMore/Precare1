import os
import sys
import warnings

warnings.filterwarnings("ignore")

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

# ==========================================
# Paths
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CHROMA_PATH = os.path.join(BASE_DIR, "chroma_db")

# ==========================================
# Check Question
# ==========================================

if len(sys.argv) < 2:
    print("Please enter a question.")
    sys.exit()

question = " ".join(sys.argv[1:]).strip()

# ==========================================
# Load Embedding Model
# ==========================================

embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={
        "device": "cpu"
    },
    encode_kwargs={
        "normalize_embeddings": True
    }
)

# ==========================================
# Load ChromaDB
# ==========================================

db = Chroma(
    persist_directory=CHROMA_PATH,
    embedding_function=embedding
)

# ==========================================
# Retrieve Best Documents
# ==========================================

docs = db.similarity_search(question, k=2)

if not docs:
    print("Sorry, I couldn't find relevant information.")
    sys.exit()

# ==========================================
# Remove duplicate chunks
# ==========================================

seen = set()
chunks = []

for doc in docs:

    text = doc.page_content.strip()

    if text in seen:
        continue

    seen.add(text)
    chunks.append(text)

# ==========================================
# Clean Text
# ==========================================

clean_lines = []

for chunk in chunks:

    for line in chunk.split("\n"):

        line = line.strip()

        if len(line) < 5:
            continue

        lower = line.lower()

        if lower.startswith("page"):
            continue

        if lower.startswith("chapter"):
            continue

        if lower.startswith("figure"):
            continue

        if lower.startswith("table"):
            continue

        if lower.startswith("copyright"):
            continue

        if lower.startswith("isbn"):
            continue

        clean_lines.append(line)

# ==========================================
# Remove duplicate lines
# ==========================================

final_answer = []

used = set()

for line in clean_lines:

    if line in used:
        continue

    used.add(line)
    final_answer.append(line)

# ==========================================
# Limit Length
# ==========================================

answer = "\n".join(final_answer[:10])

print(answer)