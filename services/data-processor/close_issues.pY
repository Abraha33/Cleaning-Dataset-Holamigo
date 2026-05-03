import os
import requests

TOKEN = os.environ.get("GITHUB_TOKEN")
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
}
BASE = "https://api.github.com/repos/Abraha33/Cleaning-Dataset-Holamigo/issues"

# Issues to close as not_planned
to_close = [9, 10, 11, 12, 13, 14]

for n in to_close:
    r = requests.patch(
        f"{BASE}/{n}",
        headers=HEADERS,
        json={"state": "closed", "state_reason": "not_planned"}
    )
    if r.status_code == 200:
        print(f"✅ Issue #{n} cerrado")
    else:
        print(f"❌ Issue #{n} error: {r.status_code} — {r.json().get('message')}")

# New issues #15, #16, #17 → move to correct status
# #15 = Done (estructura carpetas ya terminada)
# #16 = In Progress (src/ modules)
# #17 = Todo (validación manual)
print("\n✅ Listo. Ahora actualiza el Project board manualmente en:")
print("https://github.com/users/Abraha33/projects/17")