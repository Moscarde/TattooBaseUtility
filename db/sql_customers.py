# customer
from db.sql_connection import connect_database
from flask import jsonify, render_template
from datetime import datetime


def db_add_customer(name, phone, birth, email, address, instagram, observations):
    conn, c = connect_database()

    c.execute(
        "INSERT INTO customers (name, phone, birth, email, address, instagram, observations) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, phone, birth, email, address, instagram, observations],
    )

    conn.commit()
    
    conn.close()



def db_update_customer(customer):
    conn, c = connect_database()

    customer_id = customer["id"]
    name = customer["name"]
    phone = customer["phone"]
    birth = datetime.now().strftime("%H:%M:%S")
    email = customer["email"]
    address = customer["address"]
    observations = customer["observations"]

    c.execute(
        "UPDATE customers SET name = ?, phone = ?, birth = ?, email = ?, address = ?, observations = ? WHERE id = ?",
        [name, phone, birth, email, address, observations, customer_id],
    )
    conn.commit()

    conn.close()

    return True


def db_get_all_customers():
    conn, c = connect_database()
    # Consultar customers
    c.execute("SELECT * FROM customers")
    customers = c.fetchall()

    # Fechar a conexão
    conn.close()
    return customers


def db_get_customer_by(column, term):
    conn, c = connect_database()
    c.execute(
        f"""SELECT *
        FROM customers 
        LEFT JOIN tattoos ON customers.id = tattoos.customer_id
        WHERE customers.{column} LIKE ?""",
        ("%" + term + "%",),
    )
    result = c.fetchall()
    conn.close()

    search_results = []
    if result:
        for customer in result:
            customer_data = {}

            customer_data["id"] = customer[0]

            customer_data["name"] = customer[1]
            customer_data["phone"] = customer[2]
            customer_data["birth"] = customer[3]
            customer_data["email"] = customer[4]
            customer_data["address"] = customer[5]
            customer_data["instagram"] = customer[6]
            customer_data["observations"] = customer[7]
            customer_data["tattoos"] = []

            if customer[8]:
                tattoo_data = {
                    "tattoo_id": customer[8],
                    "tattoo_name": customer[10],
                    "description": customer[11],
                    "price": customer[12],
                    "comission": customer[13],
                    "payment": customer[14],
                    "date": customer[15],
                    "time": customer[16],
                    "status": customer[17],
                    "images": customer[18].split(';') if customer[18] else [],
                }
                customer_data["tattoos"].append(tattoo_data)

            customer_exists = False
            for index, customer in enumerate(search_results):
                if customer["id"] == customer_data["id"]:
                    search_results[index]["tattoos"].append(customer_data["tattoos"][0])
                    customer_exists = True
                    break

            if not customer_exists:
                search_results.append(customer_data)

    # return result
    return search_results


def db_get_customer_by_id(customer_id):
    customer = db_get_customer_by("id", customer_id)[0]
    return customer


def db_get_customer_by_name(name):
    search_results = db_get_customer_by("name", name)
    return search_results


def db_remove_customer(id):
    conn, c = connect_database()
    c.execute("DELETE FROM customers WHERE id = ?", [id])
    conn.commit()
    conn.close()
