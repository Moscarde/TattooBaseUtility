from db.sql_connection import connect_database

def db_add_tattoo(tattoo):
    conn, c = connect_database()

    customer_id = tattoo["customer_id"]
    tattoo_ = tattoo["tattoo"]
    description = tattoo["description"]
    price = tattoo["price"]
    payment = tattoo["payment"]
    date = tattoo["date"]

    c.execute(
        "INSERT INTO tattoos (customer_id, tattoo, description, price, payment, date, time, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [customer_id, tattoo_, description, price, payment, date],
    )
    conn.commit()

    conn.close()


def db_remove_tattoo(id):
    conn, c = connect_database()
    c.execute("DELETE FROM tattoos WHERE id = ?", [id])
    conn.commit()
    conn.close()


def db_get_all_tattoos():
    conn, c = connect_database()
    # Consultar customers
    c.execute("SELECT * FROM tattoos")
    tattoos = c.fetchall()
    # Fechar a conexão
    conn.close()
    return tattoos


def db_get_tattoo_by_customer_id(customer_id):
    conn, c = connect_database()

    c.execute("SELECT * FROM tattoos WHERE customer_id = ?", [customer_id])
    tattoos = c.fetchall()

    conn.close()
    return tattoos


def db_update_tattoo(tattoo):
    conn, c = connect_database()

    tattoo_id = tattoo["id"]
    customer_id = tattoo["customer_id"]
    tattoo_ = tattoo["tattoo"]
    price = tattoo["price"]
    payment = tattoo["payment"]
    date = tattoo["date"]
    time = tattoo["time"]
    status = tattoo["status"]

    c.execute(
        "UPDATE tattoos SET customer_id = ?, tattoo = ?, price = ?, payment = ?, date = ?, time = ?, status = ? WHERE id = ?",
        [customer_id, tattoo_, price, payment, date, time, status, tattoo_id],
    )
    conn.commit()

    conn.close()
