import os
from dotenv import load_dotenv

from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document

from .. import models

os.environ.setdefault("LANGCHAIN_TRACING_V2", "true")
os.environ.setdefault("LANGCHAIN_ENDPOINT", "https://api.smith.langchain.com")
os.environ.setdefault("LANGCHAIN_PROJECT", "Search_System")
os.environ['LANGCHAIN_API_KEY'] = "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"
MODEL = "deepseek-r1:1.5b"
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

llm = ChatOllama(temperature=0, model=MODEL, base_url=OLLAMA_BASE_URL)


async def load_docs():
    return await models.users.find_all().to_list()

vectorstore = None


def _build_langchain_docs(users):
    return [
        Document(page_content=f"""first_name: {user.first_name}, last_name: {user.last_name}
             , middle_name: {user.middle_name}, school: {user.school}, highlights: {user.highlights},
             position: {user.position}, height: {user.height}, weight: {user.weight},
             age: {user.age}, user_type: {user.user_type}""")
        for user in users
    ]

async def build_vectorstore():
    global vectorstore

    docs = await load_docs()
    langchain_docs = _build_langchain_docs(docs)

    if not langchain_docs:
        vectorstore = None
        return None

    text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
        chunk_size=300,
        chunk_overlap=50,
    )

    splits = text_splitter.split_documents(langchain_docs)

    vectorstore = Chroma.from_documents(
        documents=splits,
        embedding=OllamaEmbeddings(model=MODEL, base_url=OLLAMA_BASE_URL),
        persist_directory="./chroma_db",
    )
    vectorstore.persist()
    return vectorstore