````md id="y3m8qx"
# LABEL_REAL_DATABASE_SQL_V1.md

## Estado

Documento oficial : LABEL_REAL_DATABASE_SQL_V1.md

Esquema SQL inicial real para lanzar el MVP del sistema de etiquetado usando :contentReference[oaicite:0]{index=0}.

---

# Objetivo

Pasar de diseño conceptual a base de datos ejecutable en producción inicial.

```text
tablas reales
constraints reales
índices reales
base sólida
````

---

# Principio Rector

```text id="m2q7ta"
Primero correcto y simple.
Luego complejo y escalable.
```

---

# Extensiones Recomendadas

```sql id="p5n8dw"
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

Para:

```text id="x1r6pk"
gen_random_uuid()
```

---

# Tabla roles

```sql id="u8m2ra"
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(120) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# Tabla users

```sql id="k5q9tv"
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id UUID NOT NULL REFERENCES roles(id),
  name VARCHAR(160) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# Tabla products

```sql id="j3m1ls"
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(80) UNIQUE NOT NULL,
  internal_code VARCHAR(80) UNIQUE,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(120),
  category VARCHAR(120),
  unit VARCHAR(40),
  price NUMERIC(14,2) NOT NULL DEFAULT 0,
  status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
  version_number INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# Tabla batches

```sql id="r6q4mx"
CREATE TABLE batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(80) UNIQUE NOT NULL,
  name VARCHAR(180) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'OPEN',
  priority VARCHAR(30) NOT NULL DEFAULT 'NORMAL',
  created_by UUID NOT NULL REFERENCES users(id),
  started_at TIMESTAMPTZ NULL,
  closed_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# Tabla batch_items

```sql id="w2n7pk"
CREATE TABLE batch_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  assigned_user_id UUID NULL REFERENCES users(id),
  status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
  locked_by UUID NULL REFERENCES users(id),
  locked_at TIMESTAMPTZ NULL,
  started_at TIMESTAMPTZ NULL,
  completed_at TIMESTAMPTZ NULL,
  changes_count INT NOT NULL DEFAULT 0,
  print_count INT NOT NULL DEFAULT 0,
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# Tabla label_templates

```sql id="f9m3ra"
CREATE TABLE label_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(80) UNIQUE NOT NULL,
  name VARCHAR(180) NOT NULL,
  width_mm NUMERIC(10,2) NOT NULL,
  height_mm NUMERIC(10,2) NOT NULL,
  printer_type VARCHAR(40) NOT NULL,
  version INT NOT NULL DEFAULT 1,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# Tabla printers

```sql id="t1q8dw"
CREATE TABLE printers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(160) NOT NULL,
  type VARCHAR(40) NOT NULL,
  location VARCHAR(180),
  ip_address VARCHAR(80),
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# Tabla print_jobs

```sql id="h7r2pk"
CREATE TABLE print_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_item_id UUID REFERENCES batch_items(id),
  template_id UUID NOT NULL REFERENCES label_templates(id),
  printer_id UUID NOT NULL REFERENCES printers(id),
  requested_by UUID NOT NULL REFERENCES users(id),
  copies INT NOT NULL CHECK (copies > 0),
  status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
  payload_json JSONB NOT NULL,
  error_message TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  started_at TIMESTAMPTZ NULL,
  finished_at TIMESTAMPTZ NULL
);
```

---

# Tabla audit_logs

```sql id="n4m9tv"
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  entity_type VARCHAR(80) NOT NULL,
  entity_id UUID NOT NULL,
  action VARCHAR(80) NOT NULL,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

# Índices Obligatorios

```sql id="p8q1ls"
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_batches_status ON batches(status);
CREATE INDEX idx_batch_items_batch_id ON batch_items(batch_id);
CREATE INDEX idx_batch_items_assigned_user_id ON batch_items(assigned_user_id);
CREATE INDEX idx_print_jobs_status ON print_jobs(status);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
```

---

# Trigger updated_at

```sql id="x5r7mx"
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

```sql id="u2m6pk"
CREATE TRIGGER trg_products_updated
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_batch_items_updated
BEFORE UPDATE ON batch_items
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

---

# Seeds Iniciales

```sql id="g1q9ra"
INSERT INTO roles(code,name) VALUES
('ADMIN','Administrador'),
('SUPERVISOR','Supervisor'),
('OPERADOR','Operador'),
('QA','Calidad'),
('AUDITOR','Auditor'),
('GERENCIA','Gerencia');
```

---

# Validaciones Futuras

```text id="v7m3tw"
ENUM reales o CHECK constraints
RLS si multiempresa
particionado logs
materialized views analytics
```

---

# Qué NO Haría Ahora

```text id="k4n8ls"
50 tablas extras
JSON para todo
microservicios DB separados
sobre normalización absurda
```

---

# Orden de Ejecución

```text id="s9q2pk"
1 extensiones
2 tablas maestras
3 operativas
4 índices
5 triggers
6 seeds
```

---

# Veredicto Técnico

Con este SQL ya puedes arrancar backend serio y construir encima.

---

# Próximo Documento Recomendado

```text id="e6m1ra"
LABEL_FASTAPI_STARTER_CODE_V1.md
```

---

# Estado

Documento oficial : LABEL_REAL_DATABASE_SQL_V1.md

```
```
