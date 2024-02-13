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
        instagram TEXT,
        observations TEXT
    )
"""
    )
    conn.commit()

    c.execute(
        """
    CREATE TABLE IF NOT EXISTS tattoos (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        tattoo_name TEXT NOT NULL,
        description TEXT,
        price INTEGER,
        comission INTEGER,
        payment TEXT,
        date TEXT,
        time TEXT,
        status TEXT,
        images TEXT,
        FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
    )"""
    )
    conn.commit()


    conn.close()


def connect_database():
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    return conn, c


def populate_database(table, data):
    conn, c = connect_database()

    if table == "customers":
        query = f"""
            INSERT INTO customers (name, phone, birth, email, address, instagram, observations)
            VALUES
                ('{data["name"]}', {data["phone"]}, '{data["birth"]}', '{data["email"]}', '{data["address"]}', '{data["instagram"]}', '{data["observations"]}')
            
    """

        c.execute(query)
        conn.commit()
        conn.close()

    elif table == "tattoos":
        query = f"""
            INSERT INTO tattoos (customer_id, tattoo_name, description, price, comission, payment, date, time, status, images)
            VALUES
                ({data["customer_id"]}, '{data["tattoo_name"]}', '{data["description"]}', {data["price"]}, {data["comission"]}, '{data["payment"]}', '{data["date"]}', '{data["time"]}', '{data["status"]}', '{data["images"]}')
                """

        c.execute(query)
        conn.commit()
        conn.close()


if __name__ == "__main__":
    #remove db if exists
    import os
    if os.path.exists(db_path):
        os.remove(db_path)
    start_database()
    print("Base criada")

    data_customers = [
        {
            "name": "Joao Silva",
            "phone": 123456789,
            "birth": "1990-05-15",
            "email": "joao@example.com",
            "address": "Rua A, 123",
            "instagram": "@joaosilva",
            "observations": "obs",
        },
        {
            "name": "Maria Oliveira",
            "phone": 123456789,
            "birth": "1990-05-15",
            "email": "maria@example.com",
            "address": "Rua B, 456",
            "instagram": "@mariaoliveira",
            "observations": "obs",
        },
        {
            "name": "Carlos Pereira",
            "phone": 123456789,
            "birth": "1985-09-20",
            "email": "carlos@example.com",
            "address": "Rua C, 789",
            "instagram": "@carlosp",
            "observations": "obs",
        },
        {
            "name": "Joaquim Costa",
            "phone": 123456789,
            "birth": "1985-09-20",
            "email": "joaquim@example.com",
            "address": "Rua D, 987",
            "instagram": "@joaquimcosta",
            "observations": "obs",
        },
        {
            "name": "Ana Souza",
            "phone": 123456789,
            "birth": "1985-09-20",
            "email": "ana@example.com",
            "address": "Rua E, 654",
            "instagram": "@anasouza",
            "observations": "obs",
        },
    ]

    data_tattoos = [
        {
            "customer_id": 1,
            "tattoo_name": "Tattoo 1",
            "description": "Description 1",
            "price": 100,
            "comission": 40,
            "payment": "cash",
            "date": "2022-01-01",
            "time": "10:00",
            "status": "done",
            "images": "tattoo1.jpg;tattoo2.jpg;tattoo3.jpg",
        },
        {
            "customer_id": 2,
            "tattoo_name": "Tattoo 2",
            "description": "Description 2",
            "price": 200,
            "comission": 40,
            "payment": "credit",
            "date": "2022-02-02",
            "time": "11:00",
            "status": "scheduled",
            "images": "tattoo3.jpg",
        },
        {
            "customer_id": 3,
            "tattoo_name": "Tattoo 3",
            "description": "Description 3",
            "price": 300,
            "comission": 60,
            "payment": "cash",
            "date": "2022-03-03",
            "time": "12:00",
            "status": "scheduled",
            "images": "tattoo1.jpg;tattoo2.jpg;tattoo3.jpg",
        },
        {
            "customer_id": 4,
            "tattoo_name": "Tattoo 4",
            "description": "Description 4",
            "price": 400,
            "comission": 60,
            "payment": "credit",
            "date": "2022-04-04",
            "time": "13:00",
            "status": "scheduled",
            "images": "tattoo1.jpg;tattoo2.jpg;tattoo3.jpg",
        },
        {
            "customer_id": 4,
            "tattoo_name": "Tattoo 5",
            "description": "Description 5",
            "price": 500,
            "comission": 100,
            "payment": "cash",
            "date": "2022-05-05",
            "time": "14:00",
            "status": "done",
            "images": "tattoo1.jpg;tattoo2.jpg;tattoo3.jpg",
        },
    ]


    for customer in data_customers:
        populate_database("customers", customer)

    for tattoo in data_tattoos:
        populate_database("tattoos", tattoo)

    print("Base preenchida")
