from db.sql_connection import connect_database


def db_add_tattoo(
    customer_id, tattoo_name, description, price, comission, payment, date, time, status
):
    conn, c = connect_database()
    c.execute(
        "INSERT INTO tattoos (customer_id, tattoo_name, description, price, comission, payment, date, time, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
            customer_id,
            tattoo_name,
            description,
            price,
            comission,
            payment,
            date,
            time,
            status,
        ],
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


def db_update_tattoo(
    tattoo_id, tattoo_name, description, price, comission, payment, date, time, status
):
    conn, c = connect_database()

    c.execute(
        "UPDATE tattoos SET tattoo_name = ?, description = ?, price = ?, comission = ?, payment = ?, date = ?, time = ?, status = ? WHERE id = ?",
        [ tattoo_name, description, price, comission, payment, date, time, status, tattoo_id],
    )
    conn.commit()

    conn.close()
