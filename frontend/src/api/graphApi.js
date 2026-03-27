import axios from "axios";

const API_URL = "http://localhost:4000/api/graph";

export async function fetchGraph() {
    const response = await axios.get(API_URL);
    return response.data;
}

export async function saveGraph(graph) {
    const response = await axios.post(API_URL, graph);
    return response.data;
}