import sqlite3
from datetime import datetime
from flask import jsonify

db_path = "db/database.db"


def start_database():
    # Conectar ao banco de dados SQLite (será criado se não existir)
    conn, c = connect_database()

    # Criar tabela de customers se não existir
    c.execute(
        """
    CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        phone INTEGER,
        birth TEXT,
        email TEXT,
        address TEXT,
        instagram TEXT
    )
"""
    )
    conn.commit()

    c.execute(
        """
    CREATE TABLE IF NOT EXISTS tattoos (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        tattoo TEXT NOT NULL,
        description TEXT,
        price INTEGER,
        payment TEXT,
        date TEXT,
        status TEXT,
        FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
    )"""
    )
    conn.commit()

    conn.close()


def connect_database():
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    return conn, c


if __name__ == "__main__":

    start_database()
    print('Base criada')