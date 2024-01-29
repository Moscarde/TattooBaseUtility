import os
import win32api

def main():
    file_path = create_user_file()

    add_tattoo_purchase(file_path)

    if question("Continuar") == "Sim":
        main()

def message_box(title, subtitle):
    win32api.MessageBox(0, subtitle, title)

def create_user_file():
    print("Insira um nome para começar o cadastro ou procurar um existente:")
    name = input("Nome:\n> ")

    file_path = f"database/clientes/{name.upper()}.txt"
    if check_if_name_exists(file_path):
        print("Cadastro encontrado!")
        message_box("Sucesso", "Cadastro encontrado!")
        return file_path

    print("Cadastro não encontrado. Prosseguindo com um novo cadastro...")
    header = create_header(name)
    create_file_with_header(file_path, header)
    message_box("Sucesso", "Dados Pessoais criados com sucesso!")

    if question("Criar Anaminese?") == "Sim":
        anaminese = create_heath_history()
        add_to_file(file_path, anaminese)
        message_box("Sucesso", "Anaminese criada com sucesso!")

    return file_path


def create_header(name):
    phone = input("\nTelefone:\n> ")

    birth = input("\nNascimento:\n> ")

    email = input("\nEmail:\n> ")

    address = input("\nEndereço:\n> ")

    header = f"""DADOS PESSOAIS
Nome: {name}
Telefone: {phone}
Nascimento: {birth}
Email: {email}
Endereço: {address}
"""

    return header


def check_if_name_exists(filename):
    if os.path.exists(filename):
        return True
    return False


def create_file_with_header(file_path, header):
    with open(file_path, "w", encoding="utf-8") as file:
        file.write(header)

    return file_path


def create_heath_history():
    cirurgia = question("Já fez alguma cirurgia?", True)

    remedio = question("Toma algum remédio?", True)

    anticoncepcional = question("Toma anticoncepcional?", True)

    alergia = question("Alergia a medicamento?", True)

    pressao = question("Sabe sua pressão?", True)

    tratamento = question("Faz tratamento médico?", True)

    # questions
    gestante = question("Está gestante?")

    figado_rim = question("Problemas no figado ou rim?")

    fumante = question("Você é fumante?")

    hepatite = question("Já teve hepatite?")

    diabetes = question("Tem diabetes?")

    asma = question("Tem asma?")

    cardiaco = question("Tem problema cardíaco?")

    convulsao = question("Já teve convulsão?")

    renal = question("Tem problema renal?")

    tontura = question("Costuma sentir tontura?")

    heath_history = f"""ANAMINESE
Já fez alguma cirurgia?
{cirurgia}

Toma algum remédio?
{remedio}

Toma anticoncepcional?
{anticoncepcional}

Alergia a medicamento?
{alergia}

Sabe qual a sua pressão?
{pressao}

Faz tratamento médico?
{tratamento}

Está gestante?
{gestante}

Problemas no fígado ou rim?
{figado_rim}

Você é fumante?
{fumante}

Já teve hepatite?
{hepatite}

Tem diabetes?
{diabetes}

Tem asma?
{asma}

Tem problema cardíaco?
{cardiaco}

Já teve convulsão?
{convulsao}

Tem problema renal?
{renal}

Costuma sentir tontura?
{tontura}
"""
    return heath_history


def question(question, specific=False):
    options = {1: "Sim", 2: "Não"}
    option = int(input(f"{question} - Digite [1] para SIM e [2] para NÂO\n> "))
    if specific and option == 1:
        witch = input(f"Qual?\n> ")
        return options[option] + " - " + witch

    return options[option]


def add_to_file(file_path, content):
    with open(file_path, "a", encoding="utf-8") as file:
        file.write(f"\n{content}")

    return file_path


def add_tattoo_purchase(file_path):
    print("\nCriando uma compra de tattoo")
    date = input("Data da tattoo?\n> ")
    tattoo = input("Qual o nome do tatuagem?\n> ")
    price = input("Qual o valor do tatuagem?\n> ")
    type_ = input("Qual a forma de pagamento?\n> ")

    tattoo_purchase = f"""COMPRA
Tattoo: {tattoo}
Data: {date}
Valor: {price}
Forma de pagamento: {type_}
"""
    add_to_file(file_path, tattoo_purchase)


if __name__ == "__main__":
    main()
    
