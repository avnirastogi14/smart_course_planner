from collections import defaultdict

def build_graph(prereqs):
    graph = defaultdict(list)
    for p in prereqs:
        graph[p["prerequisite"]].append(p["course"])
    return graph