def prereq_violations(courses, history, selected):
    passed = {
        h["course_id"] for h in history if h["status"] == "PASSED"
    }

    course_map = {c["course_id"]: c for c in courses}

    violations = []

    for cid in selected:
        course = course_map.get(cid)
        if not course:
            continue

        prereqs = course.get("prerequisites", [])

        for p in prereqs:
            if p not in passed:
                violations.append(f"{cid} missing prerequisite {p}")

    return violations