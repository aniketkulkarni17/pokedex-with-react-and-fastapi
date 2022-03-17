from re import L
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import sqlite3

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

current_user_email = ""

def create_userdata_table(user_info: dict):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE userdata (
        email text,
        password text,
        pokemon null
        )
        """)
    data = [(user_info['email'], user_info['password'], "")]
    cursor.executemany("INSERT INTO userdata VALUES (?,?,?)", data)
    conn.commit()
    conn.close()
    return True

def add_user(email, password):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    data = [(email, password, "")]
    cursor.executemany("INSERT INTO userdata VALUES (?,?,?)", data)
    conn.commit()
    conn.close()

def print_db():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM userdata")
    print(cursor.fetchall())

def check_if_user_exists(email):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT email FROM userdata")
    emails = cursor.fetchall()
    emails = [i[0] for i in emails]
    if email in emails:
        conn.commit()
        conn.close()
        return True
    else:
        conn.commit()
        conn.close()
        return False

def add_user_to_database(user_info):
    email = user_info['email']
    password = user_info['password']
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM userdata")
    except:
        pass
    result = cursor.fetchall()
    if result == []:
        create_userdata_table(user_info)
        conn.commit()
        conn.close()
    else:
        if (check_if_user_exists(email)):
            conn.commit()
            conn.close()
            return False
        else:
            add_user(email, password)
            print_db()
            conn.commit()
            conn.close()
            return True

def add_pokemon_to_favourite(email, pokemon_name):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("UPDATE userdata SET pokemon = (?) WHERE email = (?)", (pokemon_name, email))
    print_db()
    conn.commit()
    conn.close()


def get_user_pokemon(email):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT pokemon FROM userdata WHERE email = (?)", (email,))
    pokemon = cursor.fetchall()
    pokemon = pokemon[0][0]
    return pokemon

def check_user_credentials(email, password):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT email FROM userdata")
    emails = cursor.fetchall()
    emails = [i[0] for i in emails]
    if email in emails:
        cursor.execute("SELECT * FROM userdata WHERE email = (?)", (email,))
        data = cursor.fetchall()
        if password == data[0][1]:
            conn.commit()
            conn.close()
            return True
        else:
            conn.commit()
            conn.close()
            return False
    else:    
        conn.commit()
        conn.close()
        return False


@app.get("/")
async def root():
    return {"message": "Hello Goodbye"}

@app.post("/processUserInfo/{user_info}")
async def get_user_info(user_info):
    user_info = json.loads(user_info)
    print("Recieved info: ", user_info)
    if (add_user_to_database(user_info)): return True
    return False 

@app.post("/processLoginInfo/{login_info}")
async def get_user_info(login_info):
    login_info = json.loads(login_info)
    print(login_info)
    email = login_info['email']
    password = login_info['password']
    if(check_user_credentials(email, password)):
        global current_user_email
        current_user_email = email
        return True
    return False

@app.post("/sendFavouritePokemon/{pokemon_name}")
async def get_favourite_pokemon(pokemon_name: str):
    global current_user_email
    add_pokemon_to_favourite(current_user_email, pokemon_name)
    add_pokemon_to_favourite(current_user_email, pokemon_name)
    print(pokemon_name)
    print(current_user_email)
    return "Pokemon added to favourites"

@app.get("/getFavouritePokemon")
async def send_favourite_pokemon():
    global current_user_email
    pokemon = get_user_pokemon(current_user_email)
    return pokemon