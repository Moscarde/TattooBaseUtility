import sqlite3

# Conectar ao banco de dados SQLite (será criado se não existir)
conn = sqlite3.connect('clientes.db')
c = conn.cursor()

# Criar tabela de clientes se não existir
c.execute('''
    CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY,
        nome TEXT,
        compras INTEGER
    )
''')
conn.commit()

# Adicionar um cliente
nome = 'Cliente Exemplo'
compras = 3
c.execute("INSERT INTO clientes (nome, compras) VALUES (?, ?)", (nome, compras))
conn.commit()

# Consultar clientes
c.execute("SELECT * FROM clientes")
clientes = c.fetchall()
for cliente in clientes:
    print(cliente)

# Fechar a conexão
conn.close()