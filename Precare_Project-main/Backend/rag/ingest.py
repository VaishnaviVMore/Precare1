import os
import shutil

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

# ==========================================
# CONFIGURATION
# ==========================================

DATA_FOLDER = "../data"
CHROMA_PATH = "./chroma_db"

# ==========================================
# DELETE OLD DATABASE
# ==========================================

if os.path.exists(CHROMA_PATH):
    print("Removing old ChromaDB...")
    shutil.rmtree(CHROMA_PATH)

# ==========================================
# CHECK DATA FOLDER
# ==========================================

if not os.path.exists(DATA_FOLDER):
    print(f"❌ Folder not found: {DATA_FOLDER}")
    exit()

pdf_files = [file for file in os.listdir(DATA_FOLDER) if file.endswith(".pdf")]

if len(pdf_files) == 0:
    print("❌ No PDF files found.")
    exit()

print(f"\nFound {len(pdf_files)} PDF(s)\n")

documents = []

# ==========================================
# LOAD PDF FILES
# ==========================================

for pdf in pdf_files:

    pdf_path = os.path.join(DATA_FOLDER, pdf)

    print("=" * 60)
    print(f"Loading PDF : {pdf}")

    try:
        loader = PyPDFLoader(pdf_path)
        docs = loader.load()

        print(f"Total Pages : {len(docs)}")

       

        filtered_docs = []

        for page in docs:

            text = page.page_content.strip()

            if len(text) < 150:
                continue

            lower = text.lower()

            unwanted = [
                "acknowledgements",
                "contributors",
                "editor",
                "isbn",
                "copyright",
                "contents",
                "table of contents",
                "foreword",
                "preface",
                "reviewers",
                "references"
            ]

            if any(word in lower for word in unwanted):
                continue

            filtered_docs.append(page)

        if len(filtered_docs) == 0:
            print("⚠ No useful pages found.")
            continue

        documents.extend(filtered_docs)

        print(f"Useful Pages : {len(filtered_docs)}")

    except Exception as e:
        print(f"❌ Error reading {pdf}")
        print(e)

# ==========================================
# CHECK DOCUMENTS
# ==========================================

if len(documents) == 0:
    print("\n❌ No readable documents found.")
    exit()

print("\n===================================")
print(f"Total Pages Loaded : {len(documents)}")
print("===================================")

# ==========================================
# SPLIT DOCUMENTS
# ==========================================

print("\nSplitting documents...")

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=450,
    chunk_overlap=70,
    separators=[
        "\n\n",
        "\n",
        ". ",
        " ",
        ""
    ]
)

chunks = text_splitter.split_documents(documents)

print(f"Created {len(chunks)} chunks")

if len(chunks) == 0:
    print("❌ No chunks created.")
    exit()

# ==========================================
# LOAD EMBEDDING MODEL
# ==========================================

print("\nLoading embedding model...")

embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

print("Embedding model loaded.")

# ==========================================
# CREATE CHROMADB
# ==========================================

print("\nCreating ChromaDB...")

db = Chroma.from_documents(
    documents=chunks,
    embedding=embedding,
    persist_directory=CHROMA_PATH
)

print("\n===================================")
print("✅ SUCCESS!")
print("ChromaDB Created Successfully.")
print(f"Location : {CHROMA_PATH}")
print(f"Total Documents : {len(documents)}")
print(f"Total Chunks : {len(chunks)}")
print("===================================")