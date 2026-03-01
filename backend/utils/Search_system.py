import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder
from typing import List
from .. import models, schemas


def get_ids(matches: List):
    ids = [str(user.id) for user in matches]
    return ids

async def matrix(first_name: str, last_name:str, current_user: schemas.userReturn):
    encoder = OneHotEncoder(sparse_output=False)
    
    exact_match = await models.users.find(models.users.first_name == first_name,
                                           models.users.last_name == last_name).project(models.users).to_list()
    fn_match = await models.users.find(models.users.first_name == first_name).project(models.users).to_list() # list of people with first name match
    ln_match = await models.users.find(models.users.last_name == last_name).project(models.users).to_list() # list of people with last name match
    recommended = await models.users.find(models.users.education.school == current_user.education.school).project(models.users).to_list()
    user_list = exact_match + fn_match + ln_match

    exact_ids = get_ids(exact_match)
    fn_ids = get_ids(fn_match)
    ln_ids = get_ids(ln_match)
    rec_ids = get_ids(recommended)

    all_ids = np.array(exact_ids + fn_ids + ln_ids + rec_ids).reshape(-1, 1)
    encoder.fit(all_ids)

    exact_encoded = encoder.transform(np.array(exact_ids).reshape(-1, 1))
    fn_encoded = encoder.transform(np.array(fn_ids).reshape(-1, 1))
    ln_encoded = encoder.transform(np.array(ln_ids).reshape(-1, 1))
    rec_encoded = encoder.transform(np.array(rec_ids).reshape(-1, 1))

    user_search_matrix = np.vstack([exact_encoded, fn_encoded, ln_encoded, rec_encoded])

    return user_search_matrix, user_list

async def recommendations(first_name: str, last_name: str, current_user):
    normalized_matrix, user_list = await matrix(first_name, last_name, current_user)
    
    knn = NearestNeighbors(metric='cosine', algorithm='brute')
    knn.fit(normalized_matrix)
    query_vector = normalized_matrix[0].reshape(1, -1)
    num_users = normalized_matrix.shape[0]
    distances, indices = knn.kneighbors(query_vector, n_neighbors=num_users)

    exact_match = [user_list[i] for i in indices[0]]
    fn_match = [user_list[i] for i in indices[1]]
    ln_match = [user_list[i] for i in indices[2]]
    recommended = [user_list[i] for i in indices[3]]

    results = exact_match+fn_match+ln_match+recommended
    return results

