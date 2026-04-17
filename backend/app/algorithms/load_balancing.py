from collections import defaultdict, deque

def generate_plan(courses, prereqs, max_sem, degree_req):
    course_map = {c["course_id"]: c for c in courses}

    graph = defaultdict(list)
    indegree = defaultdict(int)

    for c in course_map:
        indegree[c] = 0

    for p in prereqs:
        graph[p["prerequisite"]].append(p["course"])
        indegree[p["course"]] += 1

    queue = deque([c for c in indegree if indegree[c] == 0])

    semesters = {}
    sem = 1
    total = 0

    while queue:
        size = len(queue)
        cur_credits = 0
        semesters[sem] = []

        next_queue = deque()

        for _ in range(size):
            cid = queue.popleft()
            course = course_map[cid]
            credits = course["credits"]

            if total >= degree_req:
                return {
                    "plan": semesters,
                    "total": total,
                    "required": degree_req
                }

            if cur_credits + credits > max_sem:
                next_queue.append(cid)
                continue

            semesters[sem].append(course)
            cur_credits += credits
            total += credits

            for neigh in graph[cid]:
                indegree[neigh] -= 1
                if indegree[neigh] == 0:
                    next_queue.append(neigh)

        queue = next_queue
        sem += 1

    return {
        "plan": semesters,
        "total": total,
        "required": degree_req
    }