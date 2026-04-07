import os
from dotenv import load_dotenv
import json

import pandas as pd
from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document

import ollama

from .. import models

os.environ.setdefault("LANGCHAIN_TRACING_V2", "true")
os.environ.setdefault("LANGCHAIN_ENDPOINT", "https://api.smith.langchain.com")
os.environ.setdefault("LANGCHAIN_PROJECT", "Search_System")
os.environ['LANGCHAIN_API_KEY'] = "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"
MODEL = "deepseek-r1:1.5b"

llm = ChatOllama(temperature=0, model=MODEL)
question = "who is emma"

docs = models.users.find_all().to_list()

langchain_docs = [
    Document(page_content=f"""first_name: {user.first_name}, last_name: {user.last_name}
             , middle_name: {user.middle_name}, school: {user.school}, highlights: {user.highlights},
             position: {user.position}, height: {user.height}, weight: {user.weight},
             age: {user.age}, user_type: {user.user_type}""")
    for user in docs
]

#indexing
text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    chunk_size=300, 
    chunk_overlap=50)

splits = text_splitter.split_documents(langchain_docs)

# Index
vectorstore = Chroma.from_documents(documents=splits, # stores data in a vector database, with numeric representation allowing LLM to identify data closest to question
                                    embedding=OllamaEmbeddings(model=MODEL),
                                    persist_directory="./chroma_db")
vectorstore.persist()