import requests

# ============================================
# CONFIGURACIÓN — solo cambia estos dos valores
# ============================================
import os
TOKEN = os.environ.get("GITHUB_TOKEN")
OWNER        = "Abraha33"
REPO         = "Cleaning-Dataset-Holamigo"
# ============================================

HEADERS = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Content-Type": "application/json",
    "X-Github-Next-Global-ID": "1"
}

def graphql(query, variables={}):
    r = requests.post(
        "https://api.github.com/graphql",
        json={"query": query, "variables": variables},
        headers=HEADERS
    )
    data = r.json()
    if "errors" in data:
        raise Exception(data["errors"])
    return data["data"]


# 1) Obtener owner ID
owner_data = graphql("""
query($login: String!) {
  user(login: $login) { id }
}
""", {"login": OWNER})
owner_id = owner_data["user"]["id"]
print(f"✅ Owner ID: {owner_id}")


# 2) Crear el Project
project_data = graphql("""
mutation($ownerId: ID!, $title: String!) {
  createProjectV2(input: {ownerId: $ownerId, title: $title}) {
    projectV2 { id number url }
  }
}
""", {
    "ownerId": owner_id,
    "title":   "Pipeline Catálogo Hola Amigo JC"
})
project = project_data["createProjectV2"]["projectV2"]
project_id  = project["id"]
project_url = project["url"]
print(f"✅ Proyecto creado: {project_url}")


# 3) Obtener los campos del proyecto (Status)
fields_data = graphql("""
query($projectId: ID!) {
  node(id: $projectId) {
    ... on ProjectV2 {
      fields(first: 20) {
        nodes {
          ... on ProjectV2SingleSelectField {
            id name options { id name }
          }
        }
      }
    }
  }
}
""", {"projectId": project_id})

status_field = None
for f in fields_data["node"]["fields"]["nodes"]:
    if f.get("name") == "Status":
        status_field = f
        break

status_field_id = status_field["id"]
options = {o["name"]: o["id"] for o in status_field["options"]}
print(f"✅ Opciones de Status disponibles: {list(options.keys())}")

# 4) Usar las columnas por defecto
ISSUES_POR_COLUMNA = {
    "Done": [1, 2, 3],
    "In Progress": [4, 5],
    "Todo": [6, 7, 8]
}

# 5) Obtener IDs de los issues por número
def get_issue_id(number):
    data = graphql("""
query($owner: String!, $repo: String!, $number: Int!) {
  repository(owner: $owner, name: $repo) {
    issue(number: $number) { id }
  }
}
""", {"owner": OWNER, "repo": REPO, "number": number})
    return data["repository"]["issue"]["id"]


# 6) Añadir issues al proyecto y asignar Status
for columna, numeros in ISSUES_POR_COLUMNA.items():
    option_id = options[columna]
    for num in numeros:
        issue_id = get_issue_id(num)

        item_data = graphql("""
mutation($projectId: ID!, $contentId: ID!) {
  addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) {
    item { id }
  }
}
""", {"projectId": project_id, "contentId": issue_id})

        item_id = item_data["addProjectV2ItemById"]["item"]["id"]

        graphql("""
mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
  updateProjectV2ItemFieldValue(input: {
    projectId: $projectId,
    itemId: $itemId,
    fieldId: $fieldId,
    value: { singleSelectOptionId: $optionId }
  }) {
    projectV2Item { id }
  }
}
""", {
            "projectId": project_id,
            "itemId": item_id,
            "fieldId": status_field_id,
            "optionId": option_id
        })

        print(f"✅ Issue #{num} → {columna}")

print(f"\n🎉 Proyecto listo: {project_url}")