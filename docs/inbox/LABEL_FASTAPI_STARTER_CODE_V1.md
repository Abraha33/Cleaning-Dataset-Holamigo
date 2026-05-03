````md id="d8m4qx"
# LABEL_FASTAPI_STARTER_CODE_V1.md

## Estado

Documento oficial : LABEL_FASTAPI_STARTER_CODE_V1.md

Base inicial de código backend para arrancar el MVP del sistema de etiquetado con :contentReference[oaicite:0]{index=0}.

---

# Objetivo

Tener un backend ejecutable desde semana 1 con estructura profesional.

```text
arrancar rápido
orden correcto
escalar sin rehacer
API usable ya
````

---

# Stack Oficial

```text id="m2q7ta"
Python 3.12+
FastAPI
SQLAlchemy 2.x
Alembic
PostgreSQL
Redis
Pydantic Settings
Uvicorn
```

---

# Estructura Inicial

```text id="p5n8dw"
apps/api/
├── app/
│   ├── main.py
│   ├── core/
│   ├── api/
│   ├── modules/
│   └── models/
├── tests/
├── alembic/
├── requirements.txt
└── .env
```

---

# requirements.txt

```txt id="x1r6pk"
fastapi
uvicorn[standard]
sqlalchemy
psycopg[binary]
alembic
redis
python-jose[cryptography]
passlib[bcrypt]
pydantic-settings
python-multipart
```

---

# .env.example

```env id="u8m2ra"
APP_NAME=Label System API
ENV=dev
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/labels
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=change_me
JWT_ALGORITHM=HS256
ACCESS_TOKEN_MINUTES=30
```

---

# app/main.py

```python id="k5q9tv"
from fastapi import FastAPI
from app.api.router import api_router

app = FastAPI(title="Label System API")

app.include_router(api_router, prefix="/api/v1")


@app.get("/health")
def health():
    return {"success": True, "status": "ok"}
```

---

# app/api/router.py

```python id="j3m1ls"
from fastapi import APIRouter
from app.modules.auth.router import router as auth_router
from app.modules.products.router import router as products_router

api_router = APIRouter()
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(products_router, prefix="/products", tags=["products"])
```

---

# app/core/config.py

```python id="r6q4mx"
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str
    ENV: str
    DATABASE_URL: str
    REDIS_URL: str
    JWT_SECRET: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_MINUTES: int = 30

    class Config:
        env_file = ".env"


settings = Settings()
```

---

# app/core/database.py

```python id="w2n7pk"
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

# app/modules/auth/router.py

```python id="f9m3ra"
from fastapi import APIRouter

router = APIRouter()


@router.post("/login")
def login():
    return {"success": True, "message": "pending implementation"}
```

---

# app/modules/products/router.py

```python id="t1q8dw"
from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def list_products():
    return {"success": True, "data": []}
```

---

# app/models/product.py

```python id="h7r2pk"
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Numeric
from app.core.database import Base


class Product(Base):
    __tablename__ = "products"

    id: Mapped[str] = mapped_column(primary_key=True)
    sku: Mapped[str] = mapped_column(String(80), unique=True)
    name: Mapped[str] = mapped_column(String(255))
    price: Mapped[float] = mapped_column(Numeric(14, 2))
```

---

# Ejecutar Local

```bash id="n4m9tv"
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Windows:

```bash id="p8q1ls"
.venv\Scripts\activate
```

---

# Endpoints Iniciales

```text id="x5r7mx"
GET /health
POST /api/v1/auth/login
GET /api/v1/products
```

---

# Prioridad Semana 1

```text id="u2m6pk"
db connection
auth real
products read
alembic init
env config
```

---

# Prioridad Semana 2

```text id="g1q9ra"
users module
JWT middleware
products CRUD
batches module
```

---

# Testing Inicial

```python id="v7m3tw"
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    r = client.get("/health")
    assert r.status_code == 200
```

---

# Buenas Prácticas Inmediatas

```text id="k4n8ls"
routers delgados
services separados
typing siempre
logs estructurados
migraciones desde día 1
```

---

# Qué NO Hacer

```text id="s9q2pk"
todo en main.py
sin .env
sin tests
SQL raw disperso
copiar tutoriales sin adaptar
```

---

# Siguiente Paso Real

```text id="e6m1ra"
crear módulo auth completo
crear módulo products completo
conectar PostgreSQL real
```

---

# Próximo Documento Recomendado

```text id="r3q7tv"
LABEL_NEXTJS_STARTER_UI_V1.md
```

---

# Estado

Documento oficial : LABEL_FASTAPI_STARTER_CODE_V1.md

```
```
