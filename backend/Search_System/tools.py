from langchain.tools import tool
from . import Indexing


@tool(response_format="content_and_artifact")
def retrieve_context(query: str):
    """Retrieve information to help answer a query."""
    if Indexing.vectorstore is None:
        return "Search index is not ready yet.", []

    retrieved_docs = Indexing.vectorstore.similarity_search(query, k=2)
    serialized = "\n\n".join(
        (f"Source: {doc.metadata}\nContent: {doc.page_content}")
        for doc in retrieved_docs
    )
    return serialized, retrieved_docs